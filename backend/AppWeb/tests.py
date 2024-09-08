import json

from rest_framework.test import APITestCase
from django.urls import reverse
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.hashers import check_password
from django.core.files.uploadedfile import SimpleUploadedFile
from .models import CustomUser, Surfer, SurfClub, SurfSpot, EquipmentType, Equipment, Monitor,Photo

class UserRegisterTestCase(APITestCase):

    def setUp(self):
        # Créez un SurfSpot pour les tests
        self.surf_spot = SurfSpot.objects.create(
            name='Taghazout Beach',
            zip_code='80022',
            address='Taghazout, Morocco',
            description='A popular surf spot in Morocco',
            latitude=30.5425,
            longitude=-9.7075
        )

        # Créez un utilisateur qui est un SurfClub
        self.surf_club_user = CustomUser.objects.create_user(
            email='surfclub@example.com',
            password='strong_password',
            is_surfclub=True
        )

        # Créez un SurfClub associé à cet utilisateur
        self.surf_club = SurfClub.objects.create(
            user=self.surf_club_user,
            name='Cool Surf Club',
            surf_spot=self.surf_spot  # Utilisez le surf spot créé plus haut
        )

        # Générez un jeton JWT pour l'utilisateur surf club
        self.token = str(RefreshToken.for_user(self.surf_club_user).access_token)

    def test_register_surfer(self):
        url = reverse('register')
        data = {
            'email': 'testsurfer@example.com',
            'password': 'strong_password',
            'role': 'surfer',
            'firstname': 'Jo',
            'lastname': 'Doe',
            'birthday': '1990-01-01',
            'level': 'beginner',
        }

        response = self.client.post(url, data, format='multipart')  # Simule une requête POST
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertIn('message', response.data)

        # Vérifiez que l'utilisateur a été créé avec le rôle de surfeur
        user = CustomUser.objects.get(email='testsurfer@example.com')
        self.assertTrue(user.is_surfer)
        self.assertFalse(user.is_surfclub)
        self.assertTrue(check_password('strong_password', user.password))

        # Vérifiez que le profil surfeur est créé
        surfer = Surfer.objects.get(user=user)
        self.assertEqual(surfer.firstname, 'Jo')
        self.assertEqual(surfer.lastname, 'Doe')
        self.assertEqual(surfer.level, 'beginner')

    def test_register_surfclub(self):
        url = reverse('register')
        data = {
            'email': 'testsurfclub@example.com',
            'password': 'strong_password',
            'role': 'surfclub',
            'name': 'Cool Surf Club',
            'surf_spot': self.surf_spot.id,  # Utilisation de surf_spot
        }

        response = self.client.post(url, data, format='multipart')

        # Ajouter un affichage des erreurs si le test échoue
        if response.status_code == status.HTTP_400_BAD_REQUEST:
            print("Errors:", response.data)  # Affiche les erreurs de validation

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertIn('message', response.data)

        # Vérifiez que l'utilisateur a été créé avec le rôle de club de surf
        user = CustomUser.objects.get(email='testsurfclub@example.com')
        self.assertTrue(user.is_surfclub)
        self.assertFalse(user.is_surfer)
        self.assertTrue(check_password('strong_password', user.password))

        # Vérifiez que le profil surf club est créé
        surf_club = SurfClub.objects.get(user=user)
        self.assertEqual(surf_club.name, 'Cool Surf Club')
        self.assertEqual(surf_club.surf_spot, self.surf_spot)

    def test_login_after_registration(self):
        # Étape 1: Inscription du surfeur
        register_url = reverse('register')
        register_data = {
            'email': 'testsurfer@example.com',
            'password': 'strong_password',
            'role': 'surfer',
            'firstname': 'Jo',
            'lastname': 'Doe',
            'birthday': '1990-01-01',
            'level': 'beginner',
        }
        register_response = self.client.post(register_url, register_data, format='json')
        self.assertEqual(register_response.status_code, status.HTTP_201_CREATED)

        # Étape 2: Connexion avec les informations d'identification
        login_url = reverse('login_view')
        login_data = {
            'email': 'testsurfer@example.com',
            'password': 'strong_password',
        }
        login_response = self.client.post(login_url, login_data, format='json')

        # Vérifiez que la connexion a réussi
        self.assertEqual(login_response.status_code, status.HTTP_200_OK)
        self.assertIn('access', login_response.data)
        self.assertIn('refresh', login_response.data)

        # Vérifiez que les informations utilisateur sont retournées correctement
        self.assertEqual(login_response.data['user']['email'], 'testsurfer@example.com')
        self.assertTrue(login_response.data['user']['is_surfer'])
        self.assertFalse(login_response.data['user']['is_surfclub'])

        # Vérifiez les informations spécifiques au surfeur
        self.assertIn('surfer', login_response.data)
        self.assertEqual(login_response.data['surfer']['firstname'], 'Jo')
        self.assertEqual(login_response.data['surfer']['lastname'], 'Doe')


    def test_add_monitor_to_surf_club(self):
        # Créez les données du moniteur à ajouter
        data = {
            'first_name': 'John',
            'last_name': 'Doe',
            'birthday': '1990-01-01',
            # Retirer 'photo' si non nécessaire
        }

        # Ajoutez le jeton d'authentification dans les en-têtes
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {self.token}')

        # L'URL de l'API pour ajouter un moniteur
        url = reverse('add_monitor_to_surfclub')

        # Envoyez une requête POST pour ajouter le moniteur (format='json' si pas de fichier)
        response = self.client.post(url, data, format='json')

        # Afficher les erreurs si la requête échoue
        if response.status_code == status.HTTP_400_BAD_REQUEST:
            print("Errors:", response.data)  # Affiche les erreurs de validation

        # Vérifiez que la requête a réussi
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        # Vérifiez que le moniteur a été créé et associé au surf club
        monitor = Monitor.objects.get(first_name='John', last_name='Doe')
        self.assertEqual(monitor.surf_club, self.surf_club)
        self.assertEqual(monitor.first_name, 'John')
        self.assertEqual(monitor.last_name, 'Doe')

    def test_add_monitor_without_authentication(self):
        # Créez les données du moniteur à ajouter sans authentification
        data = {
            'first_name': 'Jane',
            'last_name': 'Smith',
            'birthday': '1985-05-05',
            # Retirer 'photo' si non nécessaire
        }

        # L'URL de l'API pour ajouter un moniteur
        url = reverse('add_monitor_to_surfclub')

        # Envoyez une requête POST sans les informations d'authentification
        response = self.client.post(url, data, format='json')

        # Vérifiez que la requête a échoué à cause de l'authentification manquante
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
class AddEquipmentTestCase(APITestCase):

    def setUp(self):
        # Créez un SurfSpot pour les tests
        self.surf_spot = SurfSpot.objects.create(
            name='Taghazout Beach',
            zip_code='80022',
            address='Taghazout, Morocco',
            description='A popular surf spot in Morocco',
            latitude=30.5425,
            longitude=-9.7075
        )

        # Créez un utilisateur qui est un SurfClub
        self.surf_club_user = CustomUser.objects.create_user(
            email='surfclub@example.com',
            password='strong_password',
            is_surfclub=True
        )

        # Créez un SurfClub associé à cet utilisateur
        self.surf_club = SurfClub.objects.create(
            user=self.surf_club_user,
            name='Cool Surf Club',
            surf_spot=self.surf_spot
        )

        # Créez des types d'équipement
        self.surfboard_type = EquipmentType.objects.create(type='surfboard')
        self.leash_type = EquipmentType.objects.create(type='leash')
        self.surfsuit_type = EquipmentType.objects.create(type='surfsuit')

        # Générez un jeton JWT pour l'utilisateur surf club
        self.token = str(RefreshToken.for_user(self.surf_club_user).access_token)

    def test_add_equipment(self):
        # Créez les données pour ajouter un équipement
        data = {
            'name': 'Test Surfboard',
            'description': 'A high-quality surfboard',
            'size': '6 feet',
            'state': 'New',
            'material_type': 'rent',  # Peut être 'rent' ou 'sale'
            'equipment_type': self.surfboard_type.id,  # Référence à l'ID du type d'équipement
            'sale_price': None,  # Pas de prix de vente pour ce test
            'rent_price': '20.00',  # Prix de location
            'quantity': 5  # Quantité de l'équipement disponible
        }

        # Ajoutez le jeton d'authentification dans les en-têtes
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {self.token}')

        # L'URL de l'API pour ajouter un équipement
        url = reverse('add_equipment')

        # Envoyez une requête POST pour ajouter l'équipement
        response = self.client.post(url, data, format='json')

        # Affichez les erreurs si la requête échoue
        if response.status_code == status.HTTP_400_BAD_REQUEST:
            print("Errors:", response.data)

        # Vérifiez que la requête a réussi
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        # Vérifiez que l'équipement a bien été créé
        equipment = Equipment.objects.get(name='Test Surfboard')
        self.assertEqual(equipment.name, 'Test Surfboard')
        self.assertEqual(equipment.surf_club, self.surf_club)
        self.assertEqual(equipment.equipment_type, self.surfboard_type)
        self.assertEqual(equipment.rent_price, 20.00)
        self.assertEqual(equipment.quantity, 5)

    def test_add_equipment_without_authentication(self):
        # Créez les données pour ajouter un équipement
        data = {
            'name': 'Test Surfboard',
            'description': 'A high-quality surfboard',
            'size': '6 feet',
            'state': 'New',
            'material_type': 'rent',
            'equipment_type': self.surfboard_type.id,
            'sale_price': None,
            'rent_price': '20.00',
            'quantity': 5
        }

        # L'URL de l'API pour ajouter un équipement
        url = reverse('add_equipment')

        # Envoyez une requête POST sans authentification
        response = self.client.post(url, data, format='json')

        # Vérifiez que la requête a échoué à cause de l'authentification manquante
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

class EquipmentUpdateTestCase(APITestCase):

    def setUp(self):
        # Créez un SurfSpot pour les tests
        self.surf_spot = SurfSpot.objects.create(
            name='Taghazout Beach',
            zip_code='80022',
            address='Taghazout, Morocco',
            description='A popular surf spot in Morocco',
            latitude=30.5425,
            longitude=-9.7075
        )

        # Créez un utilisateur qui est un SurfClub
        self.surf_club_user = CustomUser.objects.create_user(
            email='surfclub@example.com',
            password='strong_password',
            is_surfclub=True
        )

        # Créez un SurfClub associé à cet utilisateur
        self.surf_club = SurfClub.objects.create(
            user=self.surf_club_user,
            name='Cool Surf Club',
            surf_spot=self.surf_spot
        )

        # Créez un type d'équipement
        self.equipment_type = EquipmentType.objects.create(type='surfboard')

        # Créez un équipement
        self.equipment = Equipment.objects.create(
            name='Old Surfboard',
            description='An old surfboard',
            size='5 feet',
            state='Used',
            material_type='rent',
            equipment_type=self.equipment_type,
            surf_club=self.surf_club,
            rent_price=10.00,
            quantity=3
        )

        # Créez une ancienne photo associée à cet équipement
        self.old_photo = Photo.objects.create(
            equipment=self.equipment,
            image=SimpleUploadedFile("old_photo.jpg", b"file_content", content_type="image/jpeg")
        )

        # Générez un jeton JWT pour l'utilisateur surf club
        self.token = str(RefreshToken.for_user(self.surf_club_user).access_token)

class MonitorUpdateDeleteTestCase(APITestCase):

    def setUp(self):
        # Créez un SurfSpot pour les tests
        self.surf_spot = SurfSpot.objects.create(
            name='Taghazout Beach',
            zip_code='80022',
            address='Taghazout, Morocco',
            description='A popular surf spot in Morocco',
            latitude=30.5425,
            longitude=-9.7075
        )

        # Créez un utilisateur qui est un SurfClub
        self.surf_club_user = CustomUser.objects.create_user(
            email='surfclub@example.com',
            password='strong_password',
            is_surfclub=True
        )

        self.surf_club = SurfClub.objects.create(
            user=self.surf_club_user,
            name='Cool Surf Club',
            surf_spot=self.surf_spot
        )

        # Créez un moniteur associé au surf club
        self.monitor = Monitor.objects.create(
            first_name='John',
            last_name='Doe',
            birthday='1990-01-01',
            surf_club=self.surf_club
        )

        # Générez un jeton JWT pour l'utilisateur surf club
        self.token = str(RefreshToken.for_user(self.surf_club_user).access_token)

    def test_delete_monitor(self):
        # Ajoutez le jeton d'authentification dans les en-têtes
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {self.token}')

        # L'URL de l'API pour supprimer le moniteur
        url = reverse('monitor-update-delete', kwargs={'pk': self.monitor.id})

        # Envoyez une requête DELETE pour supprimer le moniteur
        response = self.client.delete(url)

        # Vérifiez que la requête a réussi
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

        # Vérifiez que le moniteur a bien été supprimé
        self.assertFalse(Monitor.objects.filter(pk=self.monitor.id).exists())

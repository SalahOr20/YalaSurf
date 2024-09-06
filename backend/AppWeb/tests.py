from rest_framework.test import APITestCase
from django.urls import reverse
from rest_framework import status
from django.contrib.auth.hashers import check_password
from .models import CustomUser, Surfer, SurfClub

class UserRegisterTestCase(APITestCase):

    def test_register_surfer(self):
        url = reverse('register')
        data = {
            'email': 'testsurfer@example.com',
            'password': 'strong_password',
            'role': 'surfer',
            'firstname': 'John',
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
        self.assertEqual(surfer.firstname, 'John')
        self.assertEqual(surfer.lastname, 'Doe')
        self.assertEqual(surfer.level, 'beginner')

    def test_register_surfclub(self):
        url = reverse('register')
        data = {
            'email': 'testsurfclub@example.com',
            'password': 'club_password',
            'role': 'surfclub',
            'name': 'Surf Club',
            'surf_spot': 'Main Beach',
        }

        response = self.client.post(url, data, format='multipart')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertIn('message', response.data)

        # Vérifiez que l'utilisateur a été créé avec le rôle de club de surf
        user = CustomUser.objects.get(email='testsurfclub@example.com')
        self.assertTrue(user.is_surfclub)
        self.assertFalse(user.is_surfer)
        self.assertTrue(check_password('club_password', user.password))

        # Vérifiez que le profil surfclub est créé
        surfclub = SurfClub.objects.get(user=user)
        self.assertEqual(surfclub.name, 'Surf Club')
        self.assertEqual(surfclub.surf_spot, 'Main Beach')



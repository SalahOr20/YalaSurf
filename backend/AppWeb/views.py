import random
from django.db import transaction

from django.contrib.auth import authenticate
from django.contrib.auth.hashers import make_password
from rest_framework import status, generics
from rest_framework.generics import get_object_or_404
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.views import APIView
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.tokens import RefreshToken

from .models import SurfClub, CustomUser, Monitor, Equipment, SurfSpot, LessonSchedule, SurfLesson, Order, Surfer, \
    SurfSession, EquipmentSelection, OrderItem, Forum, Message, Photo, EquipmentType
from .serializer import CustomUserSerializer, SurferSerializer, SurfClubSerializer, MonitorSerializer, \
    EquipmentSerializer, SurfSpotSerializer, SurfLessonSerializer, LessonScheduleSerializer, OrderSerializer, \
    SurfSessionSerializer, MessageSerializer, ForumSerializer, EquipmentTypeSerializer, \
    GetOrderSerializer, GetOrderItemSerializer, GetSurfSessionSerializer
from .services import fetch_forecast


@api_view(['POST'])
def register(request):
    if request.method == 'POST':
        # Log the request data
        print("Request data:", request.data)

        password = request.data.get('password')
        if not password:
            print("Password not provided")
            return Response({'error': 'Password is required'}, status=status.HTTP_400_BAD_REQUEST)

        hashed_password = make_password(password)
        request.data['password'] = hashed_password

        user_serializer = CustomUserSerializer(data=request.data)
        print("User serializer data:", request.data)

        if user_serializer.is_valid():
            user = user_serializer.save()
            print("User created:", user)

            role = request.data.get('role')
            print("Role:", role)

            if role == 'surfer':
                user.is_surfer = True
                user.is_surfclub = False
                user.save()
                print("User updated as surfer:", user)

                surfer_data = {
                    'user_id': user.id,
                    'firstname': request.data.get('firstname'),
                    'lastname': request.data.get('lastname'),
                    'birthday': request.data.get('birthday'),
                    'level': request.data.get('level'),
                    'photo': request.FILES.get('photo')
                }
                print("Surfer data:", surfer_data)

                surfer_serializer = SurferSerializer(data=surfer_data)
                if surfer_serializer.is_valid():
                    surfer_serializer.save()
                    print("Surfer profile created")
                else:
                    user.delete()
                    print("Surfer serializer errors:", surfer_serializer.errors)
                    return Response(surfer_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

            elif role == 'surfclub':
                user.is_surfer = False
                user.is_surfclub = True
                user.save()
                print("User updated as surf club:", user)

                surfclub_data = {
                    'user_id': user.id,
                    'name': request.data.get('name'),
                    'surf_spot': request.data.get('surf_spot'),
                    'logo': request.data.get('logo'),
                }
                print("Surf club data:", surfclub_data)

                surfclub_serializer = SurfClubSerializer(data=surfclub_data)
                if surfclub_serializer.is_valid():
                    surfclub_serializer.save()
                    print("Surf club profile created")
                else:
                    user.delete()
                    print("Surf club serializer errors:", surfclub_serializer.errors)
                    return Response(surfclub_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

            return Response({'message': 'User registered successfully'}, status=status.HTTP_201_CREATED)

        print("User serializer errors:", user_serializer.errors)
        return Response(user_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
@api_view(['POST'])
def login_view(request):
    email = request.data.get('email')
    password = request.data.get('password')
    user = authenticate(email=email, password=password)

    if user:
        refresh = RefreshToken.for_user(user)

        # Préparer la réponse de base avec les tokens
        response_data = {
            'refresh': str(refresh),
            'access': str(refresh.access_token),
            'user': {
                'id': user.id,
                'email': user.email,
                'phone_number': user.phone_number,
                'address': user.address,
                'is_surfer': user.is_surfer,
                'is_surfclub': user.is_surfclub,

            }
        }

        # Ajouter les informations supplémentaires en fonction du rôle de l'utilisateur
        if user.is_surfclub:
            surfclub = SurfClub.objects.get(user_id=user.id)
            response_data['surfclub'] = {
                'id': surfclub.id,
                'name': surfclub.name,
                'surf_spot': surfclub.surf_spot.name,  # Suppose que surf_spot a un champ 'name'
                'logo': surfclub.logo.url if surfclub.logo else None

            }
        elif user.is_surfer:
            surfer = Surfer.objects.get(user_id=user.id)
            response_data['surfer'] = {
                'id': surfer.id,
                'firstname': surfer.firstname,
                'lastname': surfer.lastname,
                'birthday': surfer.birthday,
                'level': surfer.level,
                #'photo':surfer.photo
            }

        return Response(response_data, status=status.HTTP_200_OK)

    return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)




#######Espace surf-club ######
@api_view(['GET'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def get_surfclub_profile(request):
    try:
        # Récupérer l'utilisateur actuel
        custom_user = CustomUser.objects.get(pk=request.user.id)

        # Récupérer le club de surf associé à cet utilisateur
        surf_club = SurfClub.objects.get(user=custom_user)

        # Sérialiser les données
        user_serializer = CustomUserSerializer(custom_user)
        surfclub_serializer = SurfClubSerializer(surf_club)

        # Retourner les données
        return Response({
            'user': user_serializer.data,
            'surf-club': surfclub_serializer.data
        }, status=status.HTTP_200_OK)

    except CustomUser.DoesNotExist:
        return Response({"error": "User not found."}, status=status.HTTP_404_NOT_FOUND)
    except SurfClub.DoesNotExist:
        return Response({"error": "SurfClub not found."}, status=status.HTTP_404_NOT_FOUND)
@api_view(['GET'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def surfclub_monitors(request):
    try:
        surf_club = SurfClub.objects.get(user=request.user)
        monitors=Monitor.objects.filter(surf_club=surf_club)
        monitors_serializer=MonitorSerializer(monitors,many=True)
        return Response({
             'monitors': monitors_serializer.data
         }, status=status.HTTP_200_OK)
    except Monitor.DoesNotExist:
        return Response({"error": "Monitors not found."}, status=status.HTTP_404_NOT_FOUND)

@api_view(['GET'])
def surfclub_equipement_types(request):
    try:
        # Récupérer tous les types d'équipement
        equipment_types = EquipmentType.objects.all()
        # Sérialiser les types d'équipement
        equipment_type_serializer = EquipmentTypeSerializer(equipment_types, many=True)
        # Retourner la réponse avec les données sérialisées
        return Response({
            'equipment_types': equipment_type_serializer.data
        }, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
@api_view(['GET'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def surfclub_monitor(request,pk):
    try:
        monitor=Monitor.objects.get(pk=pk)
        monitor_serializer=MonitorSerializer(monitor)
        return Response({
            'monitor': monitor_serializer.data
        }, status=status.HTTP_200_OK)
    except Monitor.DoesNotExist:
        return Response({"error": "Monitors not found."}, status=status.HTTP_404_NOT_FOUND)

@api_view(['GET'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def surfclub_equipements(request):
    try:
        surf_club = SurfClub.objects.get(user=request.user)
        equipments=Equipment.objects.filter(surf_club=surf_club)
        equipments_serializer=EquipmentSerializer(equipments,many=True)
        return Response({
          'equipments': equipments_serializer.data
          }, status=status.HTTP_200_OK)
    except Equipment.DoesNotExist:
        return Response({"error": "Equipments not found."}, status=status.HTTP_404_NOT_FOUND)

@api_view(['GET'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def surfclub_equipment(request,pk):
    try:
        equipment=Equipment.objects.get(pk=pk)
        equipment_serializer=EquipmentSerializer(equipment)
        return Response({
            'equipment': equipment_serializer.data
        }, status=status.HTTP_200_OK)
    except Equipment.DoesNotExist:
        return Response({"error": "Equipment not found."}, status=status.HTTP_404_NOT_FOUND)




@api_view(['GET'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def surfclub_LessonSchedules(request):
    try:
        surf_club=SurfClub.objects.get(user=request.user)
        lessonSchedules = LessonSchedule.objects.filter(surf_club=surf_club)
        lessonSchedules_serializer = LessonScheduleSerializer(lessonSchedules, many=True)
        return Response({
        'LessonSchedules': lessonSchedules_serializer.data
    }, status=status.HTTP_200_OK)
    except LessonSchedule.DoesNotExist:
        return Response({"error": "LessonSchedules not found."}, status=status.HTTP_404_NOT_FOUND)


@api_view(['GET'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def surfclub_LessonSchedule(request,pk):
    try:
        lesson_schedule = LessonSchedule.objects.get(pk=pk)
        LessonSchedule_serializer = LessonScheduleSerializer(lesson_schedule)
        return Response({
            'lesson_schedules': LessonSchedule_serializer.data
        }, status=status.HTTP_200_OK)
    except LessonSchedule.DoesNotExist:
        return Response({"error": "LessonSchedule not found."}, status=status.HTTP_404_NOT_FOUND)


@api_view(['GET'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def surfclub_SurfSessions(request):
    try:
        # Récupérer le club de surf associé à l'utilisateur connecté
        surf_club = SurfClub.objects.get(user=request.user)

        # Récupérer toutes les sessions de surf associées au club de surf
        surf_sessions = SurfSession.objects.filter(surf_club=surf_club).select_related('lesson_schedule', 'monitor')

        # Créer des listes pour les données sérialisées des moniteurs et des plannings des leçons
        surf_sessions_data = []

        for session in surf_sessions:
            monitor = session.monitor
            lesson_schedule = session.lesson_schedule

            # Sérialisez les données de la session de surf, du moniteur et du planning de la leçon
            session_data = SurfSessionSerializer(session).data
            monitor_data = MonitorSerializer(monitor).data
            lesson_schedule_data = LessonScheduleSerializer(lesson_schedule).data

            # Inclure les détails du moniteur et du planning de la leçon dans les données de la session
            session_data['monitor'] = monitor_data
            session_data['lesson_schedule'] = lesson_schedule_data

            surf_sessions_data.append(session_data)

        return Response({'surf_sessions': surf_sessions_data}, status=status.HTTP_200_OK)

    except SurfClub.DoesNotExist:
        return Response({"error": "SurfClub not found."}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def surfclub_SurfSession(request, pk):
    try:
        # Récupérer la session de surf spécifiée par l'ID
        surf_session = SurfSession.objects.get(pk=pk)

        # Sérialisez les données de la session de surf
        surf_session_data = SurfSessionSerializer(surf_session).data

        # Récupérez et sérialisez les détails du moniteur et du planning de la leçon
        monitor_data = MonitorSerializer(surf_session.monitor).data
        lesson_schedule_data = LessonScheduleSerializer(surf_session.lesson_schedule).data

        # Inclure les détails du moniteur et du planning de la leçon dans les données de la session
        surf_session_data['monitor'] = monitor_data
        surf_session_data['lesson_schedule'] = lesson_schedule_data

        return Response({'SurfSession': surf_session_data}, status=status.HTTP_200_OK)

    except SurfSession.DoesNotExist:
        return Response({"error": "SurfSession not found."}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def surfclub_SurfLessons(request):
    try:
        # Obtenez le surf club de l'utilisateur authentifié
        surf_club = SurfClub.objects.get(user=request.user)

        # Récupérez les leçons de surf associées à ce surf club
        surflessons = SurfLesson.objects.filter(surf_session__surf_club=surf_club)

        # Sérialisez les données des leçons de surf
        surflessons_serializer = SurfLessonSerializer(surflessons, many=True)

        # Ajout des détails du surfer pour chaque leçon
        surf_lessons_data = surflessons_serializer.data
        for lesson_data in surf_lessons_data:
            surfer = Surfer.objects.get(id=lesson_data['surfer'])
            lesson_data['surfer'] = SurferSerializer(surfer).data

        return Response({'SurfLessons': surf_lessons_data}, status=status.HTTP_200_OK)

    except SurfClub.DoesNotExist:
        return Response({"error": "Surf Club not found."}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def surfclub_SurfLesson(request, pk):
    try:
        # Récupérez la leçon de surf spécifiée par l'ID
        surf_lesson = SurfLesson.objects.get(pk=pk)
        surf_lesson_serializer = SurfLessonSerializer(surf_lesson)

        # Récupérez la session de surf associée
        surf_session = surf_lesson.surf_session
        # Récupérez le surfeur associé à la leçon
        surfer = surf_lesson.surfer
        # Récupérez le moniteur associé à la session
        monitor = surf_session.monitor
        # Récupérez le planning de la session
        lesson_schedule = surf_session.lesson_schedule
        # Récupérez les équipements sélectionnés pour la leçon
        equipment_selections = EquipmentSelection.objects.filter(surf_lesson=surf_lesson)

        # Sérialisez les données
        surfer_serializer = SurferSerializer(surfer)
        monitor_serializer = MonitorSerializer(monitor)
        lesson_schedule_serializer = LessonScheduleSerializer(lesson_schedule)

        # Préparez les détails des équipements
        equipment_details = []
        for selection in equipment_selections:
            equipment = selection.equipment
            equipment_serializer = EquipmentSerializer(equipment)
            equipment_details.append({
                'id': equipment.id,
                'name': equipment.name,
                'state': equipment.state,
                'quantity': selection.quantity,
                'equipment_details': equipment_serializer.data
            })

        return Response({
            'SurfLesson': {
                'surf_lesson': surf_lesson_serializer.data,
                'surfer': surfer_serializer.data,
                'monitor': monitor_serializer.data,
                'LessonSchedule': lesson_schedule_serializer.data,
                'equipment_selection': equipment_details
            }
        }, status=status.HTTP_200_OK)

    except SurfLesson.DoesNotExist:
        return Response({"error": "SurfLesson not found."}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

 ############# statistics for surf-club#########

@api_view(['GET'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def surfclub_statistics(request):
    try:
        # Récupérer le surf club de l'utilisateur
        surf_club = SurfClub.objects.get(user=request.user)

        # Compter les moniteurs, les équipements, les commandes et les leçons de surf
        num_monitors = Monitor.objects.filter(surf_club=surf_club).count()
        num_equipment = Equipment.objects.filter(surf_club=surf_club).count()
        num_orders = Order.objects.filter(surfer__user__is_surfclub=False, surfer__user__surfclub=surf_club).count()
        num_surf_lessons = SurfLesson.objects.filter(monitor__surf_club=surf_club).count()

        # Créer la réponse JSON
        data = {
            "surf_club_name": surf_club.name,
            "number_of_monitors": num_monitors,
            "number_of_equipment": num_equipment,
            "number_of_orders": num_orders,
            "number_of_surf_lessons": num_surf_lessons,
        }

        return Response(data, status=status.HTTP_200_OK)

    except SurfClub.DoesNotExist:
        return Response({"error": "Surf Club not found."}, status=status.HTTP_404_NOT_FOUND)
#########Update profiles for surf-club and surfer#########
@api_view(['PUT'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def update_surfclub_profile(request):
    try:
        # Récupérer l'utilisateur actuel
        custom_user = CustomUser.objects.get(pk=request.user.id)
        if not custom_user.is_surfclub:
            return Response({"error": "User is not a surfclub."}, status=status.HTTP_400_BAD_REQUEST)

        # Hachage du mot de passe s'il est fourni
        user_data = request.data.get('user')
        if user_data and 'password' in user_data:
            user_data['password'] = make_password(user_data['password'])

        # Mise à jour des informations de l'utilisateur
        user_serializer = CustomUserSerializer(custom_user, data=user_data, partial=True)
        if user_serializer.is_valid():
            user_serializer.save()
        else:
            return Response(user_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        # Mise à jour des informations du profil SurfClub
        surf_club = SurfClub.objects.get(user=custom_user)
        surfclub_serializer = SurfClubSerializer(surf_club, data=request.data.get('surf_club'), partial=True)
        if surfclub_serializer.is_valid():
            surfclub_serializer.save()
        else:
            return Response(surfclub_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        return Response({
            'user': user_serializer.data,
            'surf_club': surfclub_serializer.data
        }, status=status.HTTP_200_OK)

    except CustomUser.DoesNotExist:
        return Response({"error": "User not found."}, status=status.HTTP_404_NOT_FOUND)
    except SurfClub.DoesNotExist:
        return Response({"error": "SurfClub profile not found."}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def update_surfer_profile(request):
    try:
        # Récupérer l'utilisateur actuel
        custom_user = CustomUser.objects.get(pk=request.user.id)
        if not custom_user.is_surfer:
            return Response({"error": "User is not a surfer."}, status=status.HTTP_400_BAD_REQUEST)

        # Hachage du mot de passe s'il est fourni
        user_data = request.data.get('user')
        if user_data and 'password' in user_data:
            user_data['password'] = make_password(user_data['password'])

        # Mise à jour des informations de l'utilisateur
        user_serializer = CustomUserSerializer(custom_user, data=user_data, partial=True)
        if user_serializer.is_valid():
            user_serializer.save()
        else:
            return Response(user_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        # Mise à jour des informations du profil Surfer
        surfer = Surfer.objects.get(user=custom_user)
        surfer_serializer = SurferSerializer(surfer, data=request.data.get('surfer'), partial=True)
        if surfer_serializer.is_valid():
            surfer_serializer.save()
        else:
            return Response(surfer_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        return Response({
            'user': user_serializer.data,
            'surfer': surfer_serializer.data
        }, status=status.HTTP_200_OK)

    except CustomUser.DoesNotExist:
        return Response({"error": "User not found."}, status=status.HTTP_404_NOT_FOUND)
    except Surfer.DoesNotExist:
        return Response({"error": "Surfer profile not found."}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

####### Post urls for surf club#######
@api_view(['POST'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def add_monitor_to_surfclub(request):
    try:
        # Récupérer l'utilisateur actuel
        custom_user = CustomUser.objects.get(pk=request.user.id)
        if not custom_user.is_surfclub:
            return Response({"error": "User is not a surf club."}, status=status.HTTP_400_BAD_REQUEST)

        # Récupérer le Surf Club associé à l'utilisateur
        surf_club = SurfClub.objects.get(user=custom_user)

        # Copier les données de la requête pour éviter de modifier les données originales
        monitor_data = request.data.copy()
        monitor_data['surf_club'] = surf_club.id  # Ajouter l'ID du Surf Club aux données

        # Créer un sérialiseur pour le moniteur
        monitor_serializer = MonitorSerializer(data=monitor_data)
        if monitor_serializer.is_valid():
            monitor_serializer.save()
            return Response(monitor_serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(monitor_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    except CustomUser.DoesNotExist:
        return Response({"error": "User not found."}, status=status.HTTP_404_NOT_FOUND)
    except SurfClub.DoesNotExist:
        return Response({"error": "Surf Club not found."}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def add_equipment(request):
    try:
        # Récupérer l'utilisateur actuel
        custom_user = CustomUser.objects.get(pk=request.user.id)
        if not custom_user.is_surfclub:
            return Response({"error": "User is not a surf club."}, status=status.HTTP_400_BAD_REQUEST)

        # Récupérer le Surf Club associé à l'utilisateur
        surf_club = SurfClub.objects.get(user=custom_user)

        # Copier les données de la requête et ajouter l'ID du Surf Club
        equipment_data = request.data.copy()
        equipment_data['surf_club'] = surf_club.id
        print(equipment_data)

        # Créer un sérialiseur pour l'équipement
        equipment_serializer = EquipmentSerializer(data=equipment_data)
        if equipment_serializer.is_valid():
            equipment = equipment_serializer.save()

            # Traitement des photos
            photos = request.FILES.getlist('photos')
            for photo in photos:
                Photo.objects.create(equipment=equipment, image=photo)

            return Response(equipment_serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(equipment_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    except CustomUser.DoesNotExist:
        return Response({"error": "User not found."}, status=status.HTTP_404_NOT_FOUND)
    except SurfClub.DoesNotExist:
        return Response({"error": "Surf Club not found."}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def add_lesson_schedule(request):
    try:
        # Récupérer le Surf Club associé à l'utilisateur actuel
        surf_club = SurfClub.objects.get(user=request.user)

        # Préparer les données de la leçon en incluant l'ID du Surf Club
        lesson_schedule_data = request.data.copy()
        lesson_schedule_data['surf_club'] = surf_club.id

        # Créer un sérialiseur pour les données de la leçon
        lesson_schedule_serializer = LessonScheduleSerializer(data=lesson_schedule_data)

        if lesson_schedule_serializer.is_valid():
            # Sauvegarder les données si elles sont valides
            lesson_schedule_serializer.save()
            # Retourner les données sérialisées avec un statut 201 Created
            return Response(lesson_schedule_serializer.data, status=status.HTTP_201_CREATED)
        else:
            # Retourner les erreurs de sérialisation avec un statut 400 Bad Request
            return Response(lesson_schedule_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    except SurfClub.DoesNotExist:
        # Retourner une erreur si le Surf Club n'est pas trouvé
        return Response({"error": "Surf Club not found."}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        # Retourner une erreur générale pour d'autres exceptions
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def create_surf_session(request):
    try:
        user = request.user
        surf_club = get_object_or_404(SurfClub, user=user)

        lesson_schedule_id = request.data.get('lesson_schedule')
        if not lesson_schedule_id:
            return Response({"error": "Lesson schedule is required."}, status=status.HTTP_400_BAD_REQUEST)

        lesson_schedule = get_object_or_404(LessonSchedule, id=lesson_schedule_id, surf_club=surf_club)

        inactive_monitors = Monitor.objects.filter(surf_club=surf_club, active=False)
        if not inactive_monitors:
            return Response({"error": "No inactive monitors available in the selected surf club."},
                            status=status.HTTP_400_BAD_REQUEST)

        monitor = random.choice(inactive_monitors)

        surf_session_data = {
            'surf_club': surf_club.id,
            'lesson_schedule': lesson_schedule.id,
            'monitor': monitor.id
        }
        print(surf_session_data)
        serializer = SurfSessionSerializer(data=surf_session_data)

        if serializer.is_valid():
            surf_session = serializer.save()

            monitor.active = True
            monitor.save()

            return Response(serializer.data, status=status.HTTP_201_CREATED)

        print("Serializer Errors:", serializer.errors)  # Debugging line
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    except SurfClub.DoesNotExist:
        return Response({"error": "Surf Club not found."}, status=status.HTTP_404_NOT_FOUND)
    except LessonSchedule.DoesNotExist:
        return Response({"error": "Lesson Schedule not found."}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

######### Get for SurfSpot########
@api_view(['GET'])
def get_surfspots(request):
    try:
        surfspots=SurfSpot.objects.all()
        surfspots_serializer=SurfSpotSerializer(surfspots,many=True)
        return Response(surfspots_serializer.data, status=status.HTTP_200_OK)
    except SurfSpot.DoesNotExist:
        return Response({"error": "Surf Spots not found."}, status=status.HTTP_404_NOT_FOUND)

@api_view(['GET'])
def surf_spot_details(request, pk):
    try:
        spot = SurfSpot.objects.get(id=pk)
        forecast = fetch_forecast(spot.latitude, spot.longitude)
        # Inclure les données de prévision dans la réponse
        spot_data = SurfSpotSerializer(spot).data
        spot_data['forecast'] = forecast
        return Response(spot_data, status=status.HTTP_200_OK)
    except SurfSpot.DoesNotExist:
        return Response({"error": "Surf spot not found."}, status=status.HTTP_404_NOT_FOUND)
@api_view(['GET'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def get_surfspot(request,pk):
    try:
        surfspot= SurfSpot.objects.get(pk=pk)
        surfspot_serializer = SurfSpotSerializer(surfspot)

        return Response({'surf-spot':surfspot_serializer.data,
                               }, status=status.HTTP_200_OK)
    except SurfSpot.DoesNotExist:
        return Response({"error": "Surf Spots not found."}, status=status.HTTP_404_NOT_FOUND)
@api_view(['GET'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def get_surfclub_lesson(request, pk):
    try:
        # Récupérer le surf club avec l'ID donné
        surfclub = SurfClub.objects.get(pk=pk)

        # Récupérer toutes les sessions de surf liées au surf club
        surfsessions = SurfSession.objects.filter(surf_club=surfclub)
        surfsessions_serializer = GetSurfSessionSerializer(surfsessions, many=True)

        # Filtrer les équipements qui sont à louer (material_type='rent') et où is_rent est False
        equipments = Equipment.objects.filter(surf_club=surfclub, material_type='rent', is_rent=False)
        equipments_serializer = EquipmentSerializer(equipments, many=True)

        return Response({
            'SurfSession': surfsessions_serializer.data,
            'Equipments': equipments_serializer.data
        }, status=status.HTTP_200_OK)
    except SurfClub.DoesNotExist:
        return Response({"error": "Surf club not found."}, status=status.HTTP_404_NOT_FOUND)

@api_view(['GET'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def get_surfclub_equipments_buy(request, pk):
    try:
        # Récupérer le surf club avec l'ID donné
        surfclub = SurfClub.objects.get(pk=pk)

        # Récupérer toutes les sessions de surf liées au surf club

        # Filtrer les équipements qui sont à louer (material_type='rent') et où is_rent est False
        equipments = Equipment.objects.filter(surf_club=surfclub, material_type='sale', is_sell=False)
        equipments_serializer = EquipmentSerializer(equipments, many=True)
        return Response({
            'Equipments': equipments_serializer.data
        }, status=status.HTTP_200_OK)
    except SurfClub.DoesNotExist:
        return Response({"error": "Surf club not found."}, status=status.HTTP_404_NOT_FOUND)

#########Booking##########
@api_view(['POST'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def book_surf_lesson(request):
    try:
        data = request.data
        surfer = request.user.surfer
        surf_session = SurfSession.objects.get(pk=data['surf_session_id'])
        equipment_ids = data.get('equipment_ids', [])
        equipment_quantities = data.get('equipment_quantities', {})

        # Create SurfLesson instance
        surf_lesson = SurfLesson.objects.create(
            surfer=surfer,
            surf_session=surf_session
        )

        # Add EquipmentSelection instances and update is_rent to True
        for equipment_id in equipment_ids:
            quantity = equipment_quantities.get(str(equipment_id), 1)
            equipment = Equipment.objects.get(pk=equipment_id)

            # Create EquipmentSelection instance
            EquipmentSelection.objects.create(
                surf_lesson=surf_lesson,
                equipment=equipment,
                quantity=quantity
            )

            # Set is_rent to True for the selected equipment
            equipment.is_rent = True
            equipment.save()

        return Response({'message': 'Surf lesson booked successfully.'}, status=status.HTTP_201_CREATED)

    except SurfSession.DoesNotExist:
        return Response({"error": "Surf session not found."}, status=status.HTTP_404_NOT_FOUND)
    except Equipment.DoesNotExist:
        return Response({"error": "One or more equipment items not found."}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

#####Achat Get##########
@api_view(['GET'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def get_surfclub(request, pk):
    try:
        # Récupérer le surf club avec l'ID donné
        surfclub = SurfClub.objects.get(pk=pk)


        # Filtrer les équipements qui sont à louer (material_type='rent') et où is_rent est False
        equipments = Equipment.objects.filter(surf_club=surfclub, material_type='sale',is_sell=False, is_rent=False)
        equipments_serializer = EquipmentSerializer(equipments, many=True)

        return Response({
            'Equipments': equipments_serializer.data
        }, status=status.HTTP_200_OK)
    except SurfClub.DoesNotExist:
        return Response({"error": "Surf club not found."}, status=status.HTTP_404_NOT_FOUND)


#######Buy equipments##########
@api_view(['POST'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def create_order(request):
    try:
        with transaction.atomic():
            data = request.data
            print("Request Data:", data)

            # Récupérer le surfer de l'utilisateur authentifié
            surfer = request.user.surfer

            # Extraire les données pour le surf_club
            surf_club_id = data.get('surf_club')
            if not surf_club_id:
                return Response({"error": "Surf Club ID is required."}, status=status.HTTP_400_BAD_REQUEST)

            try:
                surf_club = SurfClub.objects.get(pk=surf_club_id)
            except SurfClub.DoesNotExist:
                return Response({"error": f"Surf Club with ID {surf_club_id} not found."}, status=status.HTTP_404_NOT_FOUND)

            # Créer une nouvelle commande (Order)
            order = Order.objects.create(surfer=surfer, surf_club=surf_club)
            print("Order Created:", order.id)

            items = data.get('items', [])
            if not items:
                return Response({"error": "No items provided."}, status=status.HTTP_400_BAD_REQUEST)

            # Ajouter les équipements sélectionnés à la commande pour achat
            for item in items:
                equipment_id = item.get('equipment')
                quantity = item.get('quantity', 1)

                if not equipment_id:
                    return Response({"error": "Equipment ID is required for each item."}, status=status.HTTP_400_BAD_REQUEST)

                try:
                    equipment = Equipment.objects.get(pk=equipment_id)
                except Equipment.DoesNotExist:
                    return Response({"error": f"Equipment with ID {equipment_id} not found."}, status=status.HTTP_404_NOT_FOUND)

                # Vérifier si l'équipement est déjà vendu
                if equipment.is_sell:
                    return Response({"error": f"Equipment {equipment.name} is already sold."}, status=status.HTTP_400_BAD_REQUEST)

                OrderItem.objects.create(
                    order=order,
                    equipment=equipment,
                    quantity=quantity
                )
                print("OrderItem Created:", equipment_id, quantity)

                # Mettre à jour l'état de l'équipement pour indiquer qu'il est vendu
                equipment.is_sell = True
                equipment.save()

            # Serialiser l'objet Order pour la réponse
            order_serializer = OrderSerializer(order)
            return Response(order_serializer.data, status=status.HTTP_201_CREATED)

    except Exception as e:
        print("Exception:", str(e))
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
##########Forums#########
@api_view(['GET'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def get_forum_details(request, surf_spot_id):
    try:
        forum = Forum.objects.get(surf_spot_id=surf_spot_id)
        messages = Message.objects.filter(forum=forum)
        forum_serializer = ForumSerializer(forum)
        message_serializer = MessageSerializer(messages, many=True)
        return Response({
            'forum': forum_serializer.data,
            'messages': message_serializer.data
        }, status=status.HTTP_200_OK)
    except Forum.DoesNotExist:
        return Response({"error": "Forum not found."}, status=status.HTTP_404_NOT_FOUND)


@api_view(['POST'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def create_message(request, forum_id):
    try:
        forum = Forum.objects.get(id=forum_id)
        message_data = request.data
        message_data['forum'] = forum.id
        custom_user=CustomUser.objects.get(pk=request.user.id)
        surfer=Surfer.objects.get(user=custom_user)
        message_data['sender'] = surfer.id
        serializer = MessageSerializer(data=message_data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    except Forum.DoesNotExist:
        return Response({"error": "Forum not found."}, status=status.HTTP_404_NOT_FOUND)


class EquipmentUpdateDeleteView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Equipment.objects.all()
    serializer_class = EquipmentSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()

        # On récupère les données existantes et on les met à jour avec celles de la requête
        data = request.data.copy()

        # Supprimer les anciennes photos si de nouvelles photos sont téléchargées
        if 'photos' in request.FILES:
            instance.photos.all().delete()  # Suppression des anciennes photos

        serializer = self.get_serializer(instance, data=data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        # Traitement des nouvelles photos
        if 'photos' in request.FILES:
            for photo in request.FILES.getlist('photos'):
                Photo.objects.create(equipment=instance, image=photo)

        if getattr(instance, '_prefetched_objects_cache', None):
            instance._prefetched_objects_cache = {}

        return Response(serializer.data, status=status.HTTP_200_OK)
class SurfSessionUpdateDeleteView(generics.RetrieveUpdateDestroyAPIView):
    queryset = SurfSession.objects.all()
    serializer_class = SurfSessionSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def update(self, request, *args, **kwargs):
        surf_session = self.get_object()
        new_monitor_id = request.data.get('monitor')

        if new_monitor_id and new_monitor_id != str(surf_session.monitor.id):
            # Rendre inactif l'ancien moniteur
            old_monitor = surf_session.monitor
            old_monitor.active = False
            old_monitor.save()

            # Rendre actif le nouveau moniteur
            new_monitor = Monitor.objects.get(id=new_monitor_id)
            new_monitor.active = True
            new_monitor.save()

        return super().update(request, *args, **kwargs)


class LessonScheduleUpdateDeleteView(generics.RetrieveUpdateDestroyAPIView):
    queryset = LessonSchedule.objects.all()
    serializer_class = LessonScheduleSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
class MonitorUpdateDeleteView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Monitor.objects.all()
    serializer_class = MonitorSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

@api_view(['GET'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def surfclub_orders(request):
    try:
        surf_club = SurfClub.objects.get(user=request.user)
        orders = Order.objects.filter(surf_club=surf_club)
        orders_serializer = GetOrderSerializer(orders, many=True)
        return Response({
            'orders': orders_serializer.data
        }, status=status.HTTP_200_OK)
    except SurfClub.DoesNotExist:
        return Response({"error": "Surf club not found."}, status=status.HTTP_404_NOT_FOUND)
    except Order.DoesNotExist:
        return Response({"error": "Orders not found."}, status=status.HTTP_404_NOT_FOUND)

@api_view(['GET'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def surfclub_orderItems(request, pk):
    try:
        order = Order.objects.get(pk=pk)
        order_items = OrderItem.objects.filter(order=order)
        order_items_serializer = GetOrderItemSerializer(order_items, many=True)
        return Response({
            'orderItems': order_items_serializer.data
        }, status=status.HTTP_200_OK)
    except Order.DoesNotExist:
        return Response({"error": "Order not found."}, status=status.HTTP_404_NOT_FOUND)
    except OrderItem.DoesNotExist:
        return Response({"error": "Order items not found."}, status=status.HTTP_404_NOT_FOUND)
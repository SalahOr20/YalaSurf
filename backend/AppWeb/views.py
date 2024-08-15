from django.contrib.auth import authenticate
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework_simplejwt.tokens import RefreshToken

from .serializer import CustomUserSerializer, SurferSerializer, SurfClubSerializer

@api_view(['POST'])
def register(request):
    user_serializer = CustomUserSerializer(data=request.data)

    if user_serializer.is_valid():
        # Crée et sauvegarde l'utilisateur
        user = user_serializer.save()

        # Définir les champs is_surfer et is_surfclub en fonction du rôle
        role = request.data.get('role')
        if role == 'surfer':
            user.is_surfer = True
            user.is_surfclub = False
            user.save()  # Sauvegarde les modifications de l'utilisateur

            # Crée et sauvegarde le profil de Surfer
            surfer_data = {
                'user': user.id,  # Associe l'ID de l'utilisateur
                'firstname': request.data.get('firstname'),
                'lastname': request.data.get('lastname'),
                'birthday': request.data.get('birthday'),
                'level': request.data.get('level'),
            }
            surfer_serializer = SurferSerializer(data=surfer_data)
            if surfer_serializer.is_valid():
                surfer_serializer.save()
            else:
                user.delete()  # Rollback user creation if profile creation fails
                return Response(surfer_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        elif role == 'surfclub':
            user.is_surfer = False
            user.is_surfclub = True
            user.save()  # Sauvegarde les modifications de l'utilisateur

            # Crée et sauvegarde le profil de SurfClub
            surfclub_data = {
                'user': user.id,  # Associe l'ID de l'utilisateur
                'name': request.data.get('name'),
            }
            surfclub_serializer = SurfClubSerializer(data=surfclub_data)
            if surfclub_serializer.is_valid():
                surfclub_serializer.save()
            else:
                user.delete()  # Rollback user creation if profile creation fails
                return Response(surfclub_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        return Response({'message': 'User registered successfully'}, status=status.HTTP_201_CREATED)

    return Response(user_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def login_view(request):
    email = request.data.get('email')
    password = request.data.get('password')
    user = authenticate(email=email, password=password)

    if user:
        refresh = RefreshToken.for_user(user)
        return Response({
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        }, status=status.HTTP_200_OK)

    return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

@api_view(['POST'])
def logout_view(request):
    try:
        refresh_token = request.data.get('refresh')
        token = RefreshToken(refresh_token)
        token.blacklist()  # Invalidate the token
        return Response({'message': 'Successfully logged out'}, status=status.HTTP_205_RESET_CONTENT)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
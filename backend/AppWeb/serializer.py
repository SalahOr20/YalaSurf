# serializers.py
from rest_framework import serializers
from .models import Surfer, SurfClub, CustomUser

class SurferSerializer(serializers.ModelSerializer):
    class Meta:
        model = Surfer
        fields = ['user', 'firstname', 'lastname', 'birthday', 'level']
        extra_kwargs = {
            'user': {'read_only': True}  # Indique que le champ `user` est en lecture seule
        }

class SurfClubSerializer(serializers.ModelSerializer):
    class Meta:
        model = SurfClub
        fields = ['user', 'name']
        extra_kwargs = {
            'user': {'read_only': True}  # Indique que le champ `user` est en lecture seule
        }


class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['email', 'password', 'phone_number', 'address']
        extra_kwargs = {
            'password': {'write_only': True}  # Assure que le mot de passe est en écriture seule
        }

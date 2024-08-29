from rest_framework import serializers
from .models import CustomUser, SurfClub, Surfer, Order, OrderItem, EquipmentSelection, \
    SurfLesson, LessonSchedule, Monitor, SurfSpot, Equipment, SurfSession, Message, Forum, EquipmentType


class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = '__all__'


class SurfClubSerializer(serializers.ModelSerializer):
    user_id = serializers.PrimaryKeyRelatedField(source='user', queryset=CustomUser.objects.all(), write_only=True)

    class Meta:
        model = SurfClub
        fields = ['user_id', 'name','logo','surf_spot']

class SurferSerializer(serializers.ModelSerializer):
    user_id = serializers.PrimaryKeyRelatedField(source='user', queryset=CustomUser.objects.all(), write_only=True)

    class Meta:
        model = Surfer
        fields = ['user_id', 'firstname','lastname','birthday','level']

class EquipmentTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = EquipmentType
        fields = '__all__'



class EquipmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Equipment
        fields = '__all__'
class SurfSpotSerializer(serializers.ModelSerializer):
    surf_clubs = SurfClubSerializer(many=True, read_only=True)  # Inclut les clubs associés

    class Meta:
        model = SurfSpot
        fields = '__all__'

class MonitorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Monitor
        fields = '__all__'
class LessonScheduleSerializer(serializers.ModelSerializer):
    class Meta:
        model = LessonSchedule
        fields = '__all__'

class SurfSessionSerializer(serializers.ModelSerializer):

    class Meta:
        model = SurfSession
        fields = '__all__'
class SurfLessonSerializer(serializers.ModelSerializer):
    class Meta:
        model = SurfLesson
        fields = '__all__'



class EquipmentSelectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = EquipmentSelection
        fields = '__all__'

class GetOrderItemSerializer(serializers.ModelSerializer):
    equipment = EquipmentSerializer()  # Détails de l'équipement

    class Meta:
        model = OrderItem
        fields = '__all__'

class GetOrderSerializer(serializers.ModelSerializer):
    surfer = SurferSerializer()  # Détails du surfeur

    class Meta:
        model = Order
        fields = '__all__'

class OrderItemSerializer(serializers.ModelSerializer):

    class Meta:
        model = OrderItem
        fields = '__all__'

class OrderSerializer(serializers.ModelSerializer):

    class Meta:
        model = Order
        fields = '__all__'



class ForumSerializer(serializers.ModelSerializer):
    class Meta:
        model = Forum
        fields = '__all__'
class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = '__all__'
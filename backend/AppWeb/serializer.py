from rest_framework import serializers
from .models import CustomUser, UserToken, SurfClub, Surfer, equipmentType, Order, OrderItem, EquipmentSelection, \
    SurfLesson, LessonSchedule, Monitor, SurfSpot, Equipment, SurfSession, Message, Forum


class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = '__all__'

class UserTokenSerializer(serializers.ModelSerializer):
    user = CustomUserSerializer()

    class Meta:
        model = UserToken
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
        model = equipmentType
        fields = '__all__'

class SurfSessionSerializer(serializers.ModelSerializer):
    class Meta:
        model = SurfSession
        fields = '__all__'

class EquipmentSerializer(serializers.ModelSerializer):
    surf_club = serializers.PrimaryKeyRelatedField(read_only=True)  # Rendre le champ `surf_club` non modifiable

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
class SurfLessonSerializer(serializers.ModelSerializer):

    class Meta:
        model = SurfLesson
        fields = '__all__'
class EquipmentSelectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = EquipmentSelection
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
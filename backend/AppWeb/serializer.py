from rest_framework import serializers
from .models import CustomUser, SurfClub, Surfer, Order, OrderItem, EquipmentSelection, \
    SurfLesson, LessonSchedule, Monitor, SurfSpot, Equipment, SurfSession, Message, Forum, EquipmentType, Photo, Contact


class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = '__all__'


class SurfClubSerializer(serializers.ModelSerializer):
    user_id = serializers.PrimaryKeyRelatedField(source='user', queryset=CustomUser.objects.all(), write_only=True)

    class Meta:
        model = SurfClub
        fields = ['id','user_id','name','logo','surf_spot']



class SurferSerializer(serializers.ModelSerializer):
    user_id = serializers.PrimaryKeyRelatedField(source='user', queryset=CustomUser.objects.all(), write_only=True)

    class Meta:
        model = Surfer
        fields = ['user_id', 'firstname','lastname','birthday','level','photo']

class EquipmentTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = EquipmentType
        fields = '__all__'



class EquipmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Equipment
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

class GetSurfSessionSerializer(serializers.ModelSerializer):
    monitor = MonitorSerializer()
    lesson_schedule=LessonScheduleSerializer()
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

class PhotoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Photo
        fields = '__all__'
class SurfSpotSerializer(serializers.ModelSerializer):
    surf_clubs = SurfClubSerializer(many=True, read_only=True)
    photos = PhotoSerializer(many=True, read_only=True)

    class Meta:
        model = SurfSpot
        fields = '__all__'

class GetSurfSessionProfileSerializer(serializers.ModelSerializer):
    monitor_first_name = serializers.CharField(source='surf_session.monitor.first_name')
    monitor_photo = serializers.ImageField(source='surf_session.monitor.photo')
    monitor_last_name = serializers.CharField(source='surf_session.monitor.last_name')
    day = serializers.CharField(source='surf_session.lesson_schedule.day')

    class Meta:
        model = SurfLesson
        fields = ['id', 'monitor_first_name', 'monitor_last_name', 'day','monitor_photo']
class GetEquipmentSerializer(serializers.ModelSerializer):
    photos = PhotoSerializer(many=True, read_only=True)
    class Meta:
        model = Equipment
        fields = '__all__'

class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = '__all__'
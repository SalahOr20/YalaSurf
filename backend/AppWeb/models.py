# models.py
import uuid

from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin




class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('The Email field must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        if password:
            user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        return self.create_user(email, password, **extra_fields)

class CustomUser(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=128)
    phone_number = models.CharField(max_length=15, null=True, blank=True)
    address = models.CharField(max_length=255, null=True, blank=True)
    is_surfer = models.BooleanField(default=False)
    is_surfclub = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = CustomUserManager()

    def __str__(self):
        return self.email

    def has_perm(self, perm, obj=None):
        """Does the user have a specific permission?"""
        return self.is_superuser or self.is_staff

    def has_module_perms(self, app_label):
        """Does the user have permissions to view the app `app_label`?"""
        return self.is_superuser or self.is_staff
class UserToken(models.Model):
    TOKEN_TYPE_CHOICES = (
        ('password_reset', 'Password Reset'),
        ('email_verification', 'Email Verification'),
    )
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='tokens')
    token = models.UUIDField(default=uuid.uuid4, unique=True, editable=False)
    token_type = models.CharField(max_length=20, choices=TOKEN_TYPE_CHOICES)
    created_at = models.DateTimeField(auto_now_add=True)
    expires_at = models.DateTimeField()





class SurfClub(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    logo=models.ImageField(upload_to='uploads/', null=True)
    surf_spot = models.ForeignKey('SurfSpot', on_delete=models.CASCADE, related_name='surf_clubs')


    def __str__(self):
        return self.name

class Surfer(models.Model):
    LEVEL_CHOICES = [
        ('beginner', 'Beginner'),
        ('intermediate', 'Intermediate'),
        ('advanced', 'Advanced'),
    ]
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
    firstname = models.CharField(max_length=255)
    lastname = models.CharField(max_length=255)
    birthday = models.DateField()
    level = models.CharField(max_length=50, choices=LEVEL_CHOICES, default='beginner')

    def __str__(self):
        return f"{self.firstname} {self.lastname}"

class equipmentType(models.Model):
    Type_CHOICES = [
        ('surfboard', 'Surfboard'),
        ('leash', 'Leash'),
        ('surfsuit', 'Surfsuit'),
    ]
    type = models.CharField(max_length=50, choices=Type_CHOICES, default='surfboard')

class Equipment(models.Model):
    MATERIAL_TYPE_CHOICES = [
        ('rent', 'Rent'),
        ('sale', 'Sale'),
    ]

    name = models.CharField(max_length=255)
    description = models.TextField()
    size = models.CharField(max_length=50)
    state = models.CharField(max_length=50)  # e.g., New, Used, Damaged
    material_type = models.CharField(max_length=4, choices=MATERIAL_TYPE_CHOICES, default='rent')
    equipment_type = models.ForeignKey('EquipmentType', on_delete=models.CASCADE, related_name='equipment')
    surf_club = models.ForeignKey('SurfClub', on_delete=models.CASCADE, related_name='equipment')
    sale_price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    rent_price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    is_rent = models.BooleanField(default=False)
    is_sell = models.BooleanField(default=False)

    def __str__(self):
        return self.name

class SurfSpot(models.Model):
    name = models.CharField(max_length=100)
    zip_code = models.CharField(max_length=20)
    address = models.CharField(max_length=255)
    description = models.TextField()

class Monitor(models.Model):
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    birthday = models.DateField()
    active = models.BooleanField(default=False)
    surf_club = models.ForeignKey(SurfClub, on_delete=models.CASCADE, related_name='monitors')

    def __str__(self):
        return f"{self.first_name} {self.last_name}"

class LessonSchedule(models.Model):
    surf_club = models.ForeignKey(SurfClub, on_delete=models.CASCADE, related_name='lesson_schedules')
    start_time = models.TimeField()
    end_time = models.TimeField()
    day_of_week = models.CharField(max_length=9, choices=[
        ('Monday', 'Monday'),
        ('Tuesday', 'Tuesday'),
        ('Wednesday', 'Wednesday'),
        ('Thursday', 'Thursday'),
        ('Friday', 'Friday'),
        ('Saturday', 'Saturday'),
        ('Sunday', 'Sunday'),
    ])  # Days of the week

    def __str__(self):
        return f"{self.surf_club.name} - {self.day_of_week} from {self.start_time} to {self.end_time}"

class SurfSession(models.Model):
    surf_club = models.ForeignKey(SurfClub, on_delete=models.CASCADE, related_name='surf_sessions')
    monitor = models.ForeignKey(Monitor, on_delete=models.CASCADE, related_name='surf_sessions')
    lesson_schedule = models.ForeignKey(LessonSchedule, on_delete=models.CASCADE, related_name='surf_sessions')

    def __str__(self):
        return f"Session at {self.surf_club.name} with {self.monitor.first_name} {self.monitor.last_name}"

class SurfLesson(models.Model):
    surfer = models.ForeignKey(Surfer, on_delete=models.CASCADE, related_name='lessons')
    surf_session = models.ForeignKey(SurfSession, on_delete=models.CASCADE, related_name='lessons')
    equipment = models.ManyToManyField(Equipment, through='EquipmentSelection', related_name='lessons')


    def __str__(self):
        return f"Lesson on {self.lesson_date} with session {self.surf_session} for {self.surfer}"
class EquipmentSelection(models.Model):
    surf_lesson = models.ForeignKey('SurfLesson', on_delete=models.CASCADE, related_name='equipment_selections')
    equipment = models.ForeignKey('Equipment', on_delete=models.CASCADE, related_name='equipment_selections')
    quantity = models.PositiveIntegerField(default=1)  # Example of an additional field

    class Meta:
        unique_together = ('surf_lesson', 'equipment')

    def __str__(self):
        return f"Lesson {self.surf_lesson.reservation_id} - Equipment {self.equipment.name} (Qty: {self.quantity})"

class Order(models.Model):
    surfer = models.ForeignKey('Surfer', on_delete=models.CASCADE, related_name='orders')
    order_date = models.DateField(auto_now_add=True)
    total_price = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)



    def __str__(self):
        return f"Order {self.id} by {self.surfer}"


class OrderItem(models.Model):
    order = models.ForeignKey('Order', on_delete=models.CASCADE, related_name='items')
    equipment = models.ForeignKey('Equipment', on_delete=models.CASCADE, related_name='order_items')
    quantity = models.PositiveIntegerField(default=1)


    def __str__(self):
        return f"{self.quantity}x {self.equipment.name} in order {self.order.id}"



class Forum(models.Model):
    surf_spot = models.OneToOneField(SurfSpot, on_delete=models.CASCADE, related_name='forum')
    def __str__(self):
        return f"Forum for {self.surf_spot.name}"

class Message(models.Model):
    forum = models.ForeignKey(Forum, on_delete=models.CASCADE, related_name='messages')
    sender = models.ForeignKey(Surfer, on_delete=models.CASCADE, related_name='messages_sent')
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Message from {self.sender} on {self.created_at}"

class Photo(models.Model):
    image = models.ImageField(upload_to='photos/')
    surf_spot = models.ForeignKey('SurfSpot', on_delete=models.CASCADE, related_name='photos', null=True, blank=True)
    equipment = models.ForeignKey('Equipment', on_delete=models.CASCADE, related_name='photos', null=True, blank=True)

    def __str__(self):
        if self.surf_spot:
            return f"Photo of {self.surf_spot.name}"
        elif self.equipment:
            return f"Photo of {self.equipment.name}"
        else:
            return "Photo"

# models.py
import uuid

from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager

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

class CustomUser(AbstractBaseUser):
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=128)
    phone_number = models.CharField(max_length=15, null=True, blank=True)
    address = models.CharField(max_length=255, null=True, blank=True)
    is_surfer = models.BooleanField(default=False)
    is_surfclub = models.BooleanField(default=False)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = CustomUserManager()

    def __str__(self):
        return self.email

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



class Surfer(models.Model):
    LEVEL_CHOICES = [
        ('beginner', 'Beginner'),
        ('intermediate', 'Intermediate'),
        ('advanced', 'Advanced'),
    ]
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, related_name='surfer_profile',null=True)
    firstname = models.CharField(max_length=255)
    lastname = models.CharField(max_length=255)
    birthday = models.DateField()
    level = models.CharField(max_length=50, choices=LEVEL_CHOICES, default='beginner')

    class Meta:
        verbose_name = 'Surfer'
        verbose_name_plural = 'Surfers'

    def __str__(self):
        return f'{self.firstname} {self.lastname}'

class SurfClub(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, related_name='surfclub_profile',null=True)
    name = models.CharField(max_length=255)

    class Meta:
        verbose_name = 'Surf Club'
        verbose_name_plural = 'Surf Clubs'

    def __str__(self):
        return self.name

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

    # Enlever 'material_id' si c'est un AutoField, car Django ajoute 'id' automatiquement
    # material_id = models.AutoField(primary_key=True)  # Supprimez ou commentez cette ligne

    name = models.CharField(max_length=255)
    description = models.TextField()
    size = models.CharField(max_length=50)
    state = models.CharField(max_length=50)  # e.g., New, Used, Damaged
    material_type = models.CharField(max_length=4, choices=MATERIAL_TYPE_CHOICES, default='rent')
    equipment_type = models.ForeignKey('EquipmentType', on_delete=models.CASCADE, related_name='equipment')
    surf_club = models.ForeignKey('SurfClub', on_delete=models.CASCADE, related_name='equipment')
    sale_price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    rent_price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)

    def __str__(self):
        return self.name

class SurfSpot(models.Model):
    name = models.CharField(max_length=100)
    zip_code = models.CharField(max_length=20)
    address = models.CharField(max_length=255)
    description = models.TextField()
    surf_club = models.ForeignKey(SurfClub, on_delete=models.CASCADE, related_name='spots')

class Monitor(models.Model):
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    birthday = models.DateField()
    surf_club = models.ForeignKey(SurfClub, on_delete=models.CASCADE, related_name='monitors')


class LessonSchedule(models.Model):
    surf_club = models.ForeignKey('SurfClub', on_delete=models.CASCADE, related_name='schedules')
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

class SurfLesson(models.Model):
    surfer = models.OneToOneField('Surfer', on_delete=models.CASCADE, related_name='lesson')
    monitor = models.ForeignKey('Monitor', on_delete=models.CASCADE, related_name='lessons')
    surf_spot = models.ForeignKey('SurfSpot', on_delete=models.CASCADE, related_name='lessons')
    lesson_schedule = models.ForeignKey('LessonSchedule', on_delete=models.CASCADE, related_name='lessons')
    equipment = models.ManyToManyField('Equipment', through='EquipmentSelection', related_name='lessons')
    lesson_date = models.DateField()
    duration = models.DurationField()

    def __str__(self):
        return f"Lesson on {self.lesson_date} with schedule {self.lesson_schedule} for {self.surfer}"


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

    def total_price(self):
        return sum(item.total_price() for item in self.items.all())

    def __str__(self):
        return f"Order {self.order_id} by {self.surfer}"


class OrderItem(models.Model):
    ORDER_TYPE_CHOICES = [
        ('rent', 'Rent'),
        ('buy', 'Buy'),
    ]

    order = models.ForeignKey('Order', on_delete=models.CASCADE, related_name='items')
    equipment = models.ForeignKey('Equipment', on_delete=models.CASCADE, related_name='order_items')
    quantity = models.PositiveIntegerField(default=1)
    order_type = models.CharField(max_length=4, choices=ORDER_TYPE_CHOICES, default='rent')
    price_per_item = models.DecimalField(max_digits=10, decimal_places=2)

    def save(self, *args, **kwargs):
        if self.order_type == 'buy':
            self.price_per_item = self.equipment.sale_price
        else:
            self.price_per_item = self.equipment.rent_price
        super().save(*args, **kwargs)

    def total_price(self):
        return self.price_per_item * self.quantity

    def __str__(self):
        return f"{self.quantity} x {self.equipment.name} for order {self.order.id}"

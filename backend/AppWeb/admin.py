from django.contrib import admin

from .models import CustomUser, Monitor, SurfClub, Surfer, equipmentType, Equipment, SurfSpot, \
    LessonSchedule, SurfLesson, EquipmentSelection, Order, OrderItem, Forum, Message

# Register your models here.
admin.site.register(CustomUser)
admin.site.register(Monitor)
admin.site.register(SurfClub)
admin.site.register(Surfer)
admin.site.register(equipmentType)
admin.site.register(Equipment)
admin.site.register(SurfSpot)
admin.site.register(LessonSchedule)
admin.site.register(SurfLesson)
admin.site.register(EquipmentSelection)
admin.site.register(Order)
admin.site.register(OrderItem)
admin.site.register(Forum)
admin.site.register(Message)


from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import token_obtain_pair

from .views import register, login_view, logout_view, get_surfclub_profile, surfclub_monitors, surfclub_monitor, \
    surfclub_equipements, surfclub_equipment, surfclub_LessonSchedules, \
    surfclub_LessonSchedule, surfclub_SurfLessons, surfclub_SurfLesson, surfclub_orders, update_surfclub_profile, \
    update_surfer_profile, add_monitor_to_surfclub, add_equipment, add_lesson_schedule, surfclub_statistics, \
    get_surfspots, get_surfspot, book_surf_lesson, create_surf_session, get_surfclub_lesson, create_order, \
    get_forum_details, create_message, surfclub_SurfSessions, surfclub_SurfSession, EquipmentUpdateDeleteView, \
    SurfSessionUpdateDeleteView, LessonScheduleUpdateDeleteView, MonitorUpdateDeleteView

urlpatterns = [
    #####Urls for users#####
    path('user/register/', register, name='register'),
    path('user/login/', login_view, name='login_view'),
    path('user/logout/', logout_view, name='logout_view'),
    path('token/', token_obtain_pair, name='token_obtain_pair'),

    ##### GET URLs for surf club#####
    path('surf-club/profile/',get_surfclub_profile,name='get_surfclub_profile'),
    path('surf-club/monitors/',surfclub_monitors,name='surfclub_monitors'),
    path('surf-club/monitors/<int:pk>/', surfclub_monitor, name='surfclub_monitor'),
    path('surf-club/equipments/', surfclub_equipements, name='surfclub_equipments'),
    path('surf-club/equipments/<int:pk>/', surfclub_equipment, name='surfclub_equipment'),
    path('surf-club/lesson-schedules/', surfclub_LessonSchedules, name='surfclub_LessonSchedules'),
    path('surf-club/lesson-schedules/<int:pk>/', surfclub_LessonSchedule, name='surfclub_LessonSchedule'),
    path('surf-club/surf-sessions/', surfclub_SurfSessions, name='surfclub_SurfSessions'),
    path('surf-club/surf-sessions/<int:pk>/', surfclub_SurfSession, name='surfclub_SurfSession'),
    path('surf-club/surf-lessons/', surfclub_SurfLessons, name='surfclub_SurfLessons'),
    path('surf-club/surf-lessons/<int:pk>/', surfclub_SurfLesson, name='surfclub_SurfLesson'),
    path('surf-club/orders/', surfclub_orders, name='surfclub-orders'),
    path('surf-club/statistics/', surfclub_statistics, name='surfclub_statistics'),

    ##### Update Profiles for surfers and surf clubs#####
    path('surf-club/profile/update/',update_surfclub_profile,name='update_surfclub_profile'),
    path('surfer/profile/update/', update_surfer_profile, name='update_surfer_profile'),
    ##### POST Urls for surf-club#####
    path('surf-club/add-monitor/',add_monitor_to_surfclub,name='add_monitor_to_surfclub'),
    path('surf-club/add-equipment/', add_equipment, name='add_equipment'),
    path('surf-club/add-lesson-schedule/', add_lesson_schedule, name='add_lesson_schedule'),
    path('surf-club/add-surf-session/', create_surf_session, name='create_surf_session'),

    ##### Get SurfSpot#####
    path('surf-spots/', get_surfspots, name='surfspots'),
    path('surf-spots/<int:pk>/',get_surfspot,name='get_surfspot'),
    ##### Get for Surfers #####
    path('surf-clubs/<int:pk>/lessons/', get_surfclub_lesson, name='get_surfclub_lesson'),
    #####POST for surfers #####
    path('surfers/book_surf_lesson/', book_surf_lesson, name='book_surf_lesson'),
    path('surfers/add-order/', create_order, name='create_order'),
    ###### Forums##########
    path('forums/<int:surf_spot_id>/', get_forum_details, name='get_forum_details'),
    path('forums/<int:forum_id>/messages/create/', create_message, name='create_message'),
    ########Update and Delete#########
    path('equipment/<int:pk>/', EquipmentUpdateDeleteView.as_view(), name='equipment-update-delete'),
    path('surf-session/<int:pk>/', SurfSessionUpdateDeleteView.as_view(), name='surf-session-update-delete'),
    path('lesson-schedule/<int:pk>/', LessonScheduleUpdateDeleteView.as_view(), name='lesson-schedule-update-delete'),
    path('monitor/<int:pk>/', MonitorUpdateDeleteView.as_view(), name='monitor-update-delete'),

]

# Generated by Django 5.1 on 2024-08-23 00:48

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('AppWeb', '0002_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='surflesson',
            name='surf_spot',
        ),
    ]

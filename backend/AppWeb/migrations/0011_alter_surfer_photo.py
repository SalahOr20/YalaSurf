# Generated by Django 5.1 on 2024-08-28 12:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('AppWeb', '0010_surfer_photo'),
    ]

    operations = [
        migrations.AlterField(
            model_name='surfer',
            name='photo',
            field=models.ImageField(blank=True, null=True, upload_to='uploads/'),
        ),
    ]

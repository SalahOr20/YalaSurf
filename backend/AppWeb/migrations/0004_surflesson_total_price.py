# Generated by Django 5.1 on 2024-09-03 02:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('AppWeb', '0003_remove_equipment_is_rent_remove_equipment_is_sell'),
    ]

    operations = [
        migrations.AddField(
            model_name='surflesson',
            name='total_price',
            field=models.DecimalField(decimal_places=2, default=0.0, max_digits=10),
        ),
    ]

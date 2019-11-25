# Generated by Django 2.2.7 on 2019-11-24 10:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('django_health_check', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='djangohealthcheckconfiguration',
            name='display_type',
            field=models.CharField(choices=[('OFF', 'OFF'), ('ERROR_PERCENTAGE', 'ERROR_PERCENTAGE'), ('NO_ERRORS_CHART', 'NO_ERRORS_CHART'), ('FULL_CHART', 'FULL_CHART')], default='OFF', max_length=100),
        ),
    ]
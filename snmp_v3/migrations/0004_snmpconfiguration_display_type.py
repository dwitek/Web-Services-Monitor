# Generated by Django 2.2.7 on 2019-11-24 09:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('snmp_v3', '0003_auto_20191115_1235'),
    ]

    operations = [
        migrations.AddField(
            model_name='snmpconfiguration',
            name='display_type',
            field=models.CharField(choices=[('OFF', 'OFF'), ('ERROR_PERCENTAGE', 'ERROR_PERCENTAGE'), ('NO_ERRORS_CHART', 'NO_ERRORS_CHART'), ('FULL_CHART', 'FULL_CHART')], default='OFF', max_length=100),
        ),
    ]

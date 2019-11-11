# Generated by Django 2.2.2 on 2019-11-11 14:30

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('snmp_v3', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='snmpconfiguration',
            name='service',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='snmp_configurations', to='services.Service'),
        ),
    ]

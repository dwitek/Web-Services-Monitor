# Generated by Django 2.2.7 on 2019-12-16 18:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ping', '0005_pingconfiguration_display_type'),
    ]

    operations = [
        migrations.AddField(
            model_name='pingconfiguration',
            name='email_notifications',
            field=models.BooleanField(default=True),
            preserve_default=False,
        ),
    ]
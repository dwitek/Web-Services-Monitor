# Generated by Django 2.2.2 on 2019-10-14 19:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('services', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='service',
            name='value',
            field=models.IntegerField(default=0),
            preserve_default=False,
        ),
    ]

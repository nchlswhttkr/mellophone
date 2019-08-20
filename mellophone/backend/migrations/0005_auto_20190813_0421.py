# Generated by Django 2.2.4 on 2019-08-13 04:21

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0004_item'),
    ]

    operations = [
        migrations.AddField(
            model_name='item',
            name='date_created',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='item',
            name='date_updated',
            field=models.DateTimeField(auto_now=True),
        ),
    ]

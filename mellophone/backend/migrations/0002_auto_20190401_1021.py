# Generated by Django 2.1.7 on 2019-04-01 10:21

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('backend', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Item',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('topic', models.CharField(max_length=100)),
                ('description', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='MeetingAttendee',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
            ],
        ),
        migrations.RenameField(
            model_name='meeting',
            old_name='date_opened',
            new_name='date_held',
        ),
        migrations.RemoveField(
            model_name='meeting',
            name='date_closed',
        ),
        migrations.AddField(
            model_name='meeting',
            name='venue',
            field=models.CharField(max_length=100, null=True),
        ),
        migrations.AddField(
            model_name='meetingattendee',
            name='meeting',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='backend.Meeting'),
        ),
        migrations.AddField(
            model_name='meetingattendee',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
    ]

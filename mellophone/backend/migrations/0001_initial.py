# Generated by Django 2.1.5 on 2019-02-04 10:54

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Meeting',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('date_opened', models.DateField(auto_now_add=True)),
                ('date_closed', models.DateField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name='Membership',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
            ],
        ),
        migrations.CreateModel(
            name='Team',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('website', models.CharField(max_length=100)),
            ],
        ),
        migrations.AddField(
            model_name='membership',
            name='team',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='backend.Team'),
        ),
        migrations.AddField(
            model_name='membership',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='meeting',
            name='team',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='backend.Team'),
        ),
    ]

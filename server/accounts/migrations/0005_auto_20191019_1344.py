# Generated by Django 2.2.6 on 2019-10-19 13:44

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0004_userdata_primaryfield'),
    ]

    operations = [
        migrations.RenameField(
            model_name='userdata',
            old_name='user',
            new_name='credentials',
        ),
    ]

# Generated by Django 2.2.6 on 2019-10-26 09:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0005_auto_20191019_1344'),
    ]

    operations = [
        migrations.AddField(
            model_name='userdata',
            name='disableAnimations',
            field=models.BooleanField(default=False),
        ),
    ]
# Generated by Django 2.2.1 on 2019-06-09 12:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('expenses', '0006_auto_20190608_1602'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='expense',
            name='location',
        ),
        migrations.AddField(
            model_name='expense',
            name='location',
            field=models.ManyToManyField(blank=True, to='expenses.Location'),
        ),
        migrations.RemoveField(
            model_name='expense',
            name='source',
        ),
        migrations.AddField(
            model_name='expense',
            name='source',
            field=models.ManyToManyField(blank=True, to='expenses.Source'),
        ),
    ]
# Generated by Django 2.2.1 on 2019-06-09 13:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('expenses', '0008_auto_20190609_1212'),
    ]

    operations = [
        migrations.AlterField(
            model_name='expense',
            name='value',
            field=models.DecimalField(decimal_places=2, max_digits=7),
        ),
    ]

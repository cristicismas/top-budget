# Generated by Django 2.2.2 on 2019-06-27 15:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('expenses', '0010_auto_20190612_1402'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='category',
            options={'verbose_name_plural': 'Categories'},
        ),
        migrations.AddField(
            model_name='location',
            name='color',
            field=models.CharField(blank=True, max_length=20),
        ),
        migrations.AddField(
            model_name='source',
            name='color',
            field=models.CharField(blank=True, max_length=20),
        ),
        migrations.AlterField(
            model_name='category',
            name='color',
            field=models.CharField(blank=True, max_length=20),
        ),
    ]
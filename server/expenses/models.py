from django.db import models

class Expense(models.Model):
    value = models.IntegerField()
    categories = models.ManyToManyField(Category)
    location = models.ForeignKey("Location", null=True, on_delete=models.SET_NULL)
    source = models.ForeignKey("Source", null=True, on_delete=models.SET_NULL)

class Category(models.Model):
    name = models.CharField(max_length=100)
    color = models.CharField(max_length=7)

class Location(models.Model):
    name = models.CharField(max_length=100)

class Source(models.Model):
    name = models.CharField(max_length=100)

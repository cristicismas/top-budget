from django.db import models
import datetime

class Expense(models.Model):
    value = models.IntegerField()
    categories = models.ManyToManyField("Category", blank=True)
    location = models.ForeignKey("Location", null=True, on_delete=models.SET_NULL)
    source = models.ForeignKey("Source", null=True, on_delete=models.SET_NULL)
    date = models.DateTimeField(auto_now=False, auto_now_add=False, default=datetime.datetime.now)

class Category(models.Model):
    name = models.CharField(max_length=100)
    color = models.CharField(max_length=7, blank=True)

class Location(models.Model):
    name = models.CharField(max_length=100)

class Source(models.Model):
    name = models.CharField(max_length=100)

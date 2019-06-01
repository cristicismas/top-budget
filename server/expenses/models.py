from django.db import models
from datetime import datetime
from django.contrib.auth.models import User

class Expense(models.Model):
    value = models.IntegerField()
    categories = models.ManyToManyField("Category", blank=True)
    location = models.ForeignKey("Location", null=True, on_delete=models.SET_NULL)
    source = models.ForeignKey("Source", null=True, on_delete=models.SET_NULL)
    owner = models.ForeignKey(User, related_name="expenses", on_delete=models.CASCADE, null=True)
    date = models.DateTimeField(auto_now=False, auto_now_add=False, default=datetime.now)

    def __str__(self):
        return self.value

class Category(models.Model):
    name = models.CharField(max_length=100)
    color = models.CharField(max_length=7, blank=True)

    def __str__(self):
        return self.name

class Location(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

class Source(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

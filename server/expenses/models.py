from django.db import models
from datetime import datetime
from django.contrib.auth.models import User

class Expense(models.Model):
    value = models.IntegerField()
    categories = models.ManyToManyField("Category", blank=True)
    locations = models.ManyToManyField("Location", blank=True)
    sources = models.ManyToManyField("Source", blank=True)
    owner = models.ForeignKey(User, related_name="expenses", on_delete=models.CASCADE, null=True)
    date = models.DateTimeField(auto_now=False, auto_now_add=False, default=datetime.now)

    def __str__(self):
        return str(self.value)

class Category(models.Model):
    name = models.CharField(max_length=100)
    owner = models.ForeignKey(User, related_name="categories", on_delete=models.CASCADE, null=True)
    color = models.CharField(max_length=7, blank=True)

    def __str__(self):
        return self.name

class Location(models.Model):
    name = models.CharField(max_length=100)
    owner = models.ForeignKey(User, related_name="locations", on_delete=models.CASCADE, null=True)

    def __str__(self):
        return self.name

class Source(models.Model):
    name = models.CharField(max_length=100)
    owner = models.ForeignKey(User, related_name="sources", on_delete=models.CASCADE, null=True)

    def __str__(self):
        return self.name

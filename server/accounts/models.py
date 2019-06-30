from django.db import models
from django.contrib.auth.models import User

class UserData(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    currency = models.CharField(max_length=10, default="USD")
    budget = models.IntegerField(default=500)
    showCategories = models.BooleanField(default=True)
    showLocations = models.BooleanField(default=True)
    showSources = models.BooleanField(default=True)

    def __str__(self):
        return self.user

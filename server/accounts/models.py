from django.db import models
from django.contrib.auth.models import User

class CustomUser(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    currency = models.CharField(max_length=10, default="USD")
    budget = models.IntegerField(default=500)

    def __str__(self):
        return self.user

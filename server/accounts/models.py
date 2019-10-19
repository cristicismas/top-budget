from django.db import models
from django.contrib.auth.models import User

class UserData(models.Model):
    CATEGORIES = 'CATEGORIES'
    LOCATIONS = 'LOCATIONS'
    SOURCES = 'SOURCES'

    PRIMARY_FIELD_TYPES = [
        (CATEGORIES, 'Categories'),
        (LOCATIONS, 'Locations'),
        (SOURCES, 'Sources')
    ]

    credentials = models.OneToOneField(User, on_delete=models.CASCADE, unique=True)
    currency = models.CharField(max_length=10, default="USD")
    budget = models.IntegerField(default=500)
    showCategories = models.BooleanField(default=True)
    showLocations = models.BooleanField(default=True)
    showSources = models.BooleanField(default=True)
    primaryField = models.CharField(max_length=10, choices=PRIMARY_FIELD_TYPES, default=CATEGORIES)

    def __str__(self):
        return self.user.username

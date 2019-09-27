from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User
from django.core.validators import MinValueValidator
from decimal import Decimal

class Expense(models.Model):
    value = models.DecimalField(max_digits=10, decimal_places=2, validators=[MinValueValidator(Decimal('0.01'))])
    category = models.ForeignKey("Category", on_delete=models.SET_NULL, null=True, blank=True)
    location = models.ForeignKey("Location", on_delete=models.SET_NULL, null=True, blank=True)
    source = models.ForeignKey("Source", on_delete=models.SET_NULL, null=True, blank=True)
    owner = models.ForeignKey(User, related_name="expenses", on_delete=models.CASCADE, null=True)
    date = models.DateTimeField(auto_now=False, auto_now_add=False, default=timezone.now)

    def __str__(self):
        return str(self.value)

class Category(models.Model):
    name = models.CharField(max_length=100)
    owner = models.ForeignKey(User, related_name="categories", on_delete=models.CASCADE, null=True)
    color = models.CharField(max_length=20, blank=True)

    def __str__(self):
        return self.name
    
    class Meta:
        verbose_name_plural = "Categories"

class Location(models.Model):
    name = models.CharField(max_length=100)
    owner = models.ForeignKey(User, related_name="locations", on_delete=models.CASCADE, null=True)
    color = models.CharField(max_length=20, blank=True)

    def __str__(self):
        return self.name

class Source(models.Model):
    name = models.CharField(max_length=100)
    owner = models.ForeignKey(User, related_name="sources", on_delete=models.CASCADE, null=True)
    color = models.CharField(max_length=20, blank=True)

    def __str__(self):
        return self.name

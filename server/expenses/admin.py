from django.contrib import admin

from .models import Expense, Category, Location, Source

admin.site.register(Expense)
admin.site.register(Category)
admin.site.register(Location)
admin.site.register(Source)

from rest_framework import viewsets, permissions

from expenses.models import Expense, Category, Location, Source
from .serializers import ExpenseSerializer, CategorySerializer, LocationSerializer, SourceSerializer

class ExpenseViewSet(viewsets.ModelViewSet):
    queryset = Expense.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = ExpenseSerializer

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = CategorySerializer

class LocationViewSet(viewsets.ModelViewSet):
    queryset = Location.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = LocationSerializer

class SourceViewSet(viewsets.ModelViewSet):
    queryset = Source.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = SourceSerializer
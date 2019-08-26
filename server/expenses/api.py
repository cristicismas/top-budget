from rest_framework import viewsets, permissions

from expenses.models import Expense, Category, Location, Source
from .serializers import ExpenseSerializer, CategorySerializer, LocationSerializer, SourceSerializer

class ExpenseViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated
    ]
    
    serializer_class = ExpenseSerializer
    
    def get_queryset(self):
        return self.request.user.expenses.order_by('-date')

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

    

class CategoryViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated
    ]
    
    serializer_class = CategorySerializer
    
    def get_queryset(self):
        return self.request.user.categories.all()

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

    

class LocationViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated
    ]
    
    serializer_class = LocationSerializer
    
    def get_queryset(self):
        return self.request.user.locations.all()

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

    

class SourceViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated
    ]
    
    serializer_class = SourceSerializer
    
    def get_queryset(self):
        return self.request.user.sources.all()

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

    
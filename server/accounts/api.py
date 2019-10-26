from rest_framework import generics, viewsets, permissions
from rest_framework.response import Response
from django.core import serializers
from knox.models import AuthToken
from .serializers import UserSerializer, UserDataSerializer, RegisterSerializer, LoginSerializer
from .models import UserData
import json

class RegisterAPI(generics.GenericAPIView):
    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()

        return Response({
            'userdata': UserDataSerializer(user.userdata, context=self.get_serializer_context()).data,
            'token': AuthToken.objects.create(user)[1]
        })

class LoginAPI(generics.GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data

        return Response({
            'userdata': UserDataSerializer(user.userdata, context=self.get_serializer_context()).data,
            'token': AuthToken.objects.create(user)[1]
        })

class UserViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated
    ]
    
    serializer_class = UserDataSerializer

    def partial_update(self, request, *args, **kwargs):
        user = UserData.objects.filter(credentials=self.request.user).update(
            currency = request.data['currency'],
            budget = request.data['budget'],
            showCategories = request.data['showCategories'],
            showLocations = request.data['showLocations'],
            showSources = request.data['showSources'],
            disableAnimations = request.data['disableAnimations'],
            primaryField = request.data['primaryField']
        )

        return Response('User data saved.')

    def get_queryset(self):
        return UserData.objects.filter(credentials=self.request.user)
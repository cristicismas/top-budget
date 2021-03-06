from rest_framework import serializers
from django.contrib.auth.models import User
from .models import UserData
from django.contrib.auth import authenticate

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'email', 'username')

class UserDataSerializer(serializers.ModelSerializer):
    credentials = UserSerializer()

    class Meta:
        model = UserData
        fields = ('currency', 'budget', 'showCategories', 'showLocations', 'showSources', 'disableAnimations', 'primaryField', 'credentials')

class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'email', 'username', 'password')
        extra_kwargs = {
            'password': { 'write_only': True }
        }
    
    def create(self, validated_data):
        user = User.objects.create_user(validated_data['username'], validated_data['email'], validated_data['password'])
        UserData.objects.create(credentials=user)

        return user

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(**data)

        if user and user.is_active:
            return user
        raise serializers.ValidationError('Incorrect Credentials')
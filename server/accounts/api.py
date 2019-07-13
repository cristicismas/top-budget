from rest_framework import generics, viewsets, permissions
from rest_framework.response import Response
from knox.models import AuthToken
from .serializers import UserSerializer, UserDataSerializer, RegisterSerializer, LoginSerializer
from .models import UserData

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

    def get_queryset(self):
        return UserData.objects.filter(user=self.request.user)
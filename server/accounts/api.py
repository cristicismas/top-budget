from rest_framework import generics, permissions
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

class UserAPI(generics.RetrieveAPIView):
    permission_classes = [ 
        permissions.IsAuthenticated,
    ]

    serializer_class = UserDataSerializer
    queryset = UserData.objects.all()

    def get_object(self):
        return self.request.user.userdata
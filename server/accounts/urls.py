from django.urls import path, include
from .api import RegisterAPI, LoginAPI
from knox import views as knox_views
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from django.conf.urls import url

urlpatterns = [
    path('api/auth/', include('knox.urls')),
    path('api/auth/register', RegisterAPI.as_view()),
    path('api/auth/login', LoginAPI.as_view()),
    path('api/auth/logout', knox_views.LogoutView.as_view(), name='knox_logout'),

    path('api/token/', TokenObtainPairView.as_view()),
    path('api/token/refresh', TokenRefreshView.as_view())
]
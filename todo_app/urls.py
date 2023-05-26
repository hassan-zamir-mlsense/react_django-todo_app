from django.contrib import admin
from django.urls import path
from . import views

# For JWT Authentication
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

# For Register API
from .views import RegisterAPI

app_name = 'todo_app'

urlpatterns = [
    path('', views.home),
    path('about/', views.about),
    path('dashboard/', views.dashboard),
    path('api/', views.api_overview, name='api-overview'),
    path('task-list/', views.task_list, name='task-list'),
    path('task-detail/<int:primary_key>/', views.task_detail, name='task-detail'),
    path('task-create/', views.task_create, name='task-create'),
    path('task-update/<str:primary_key>/', views.task_update, name='task-update'),
    path('task-delete/<int:primary_key>/', views.task_delete, name='task-delete'),

    # For JWT Authentication
    path('api/login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    # path('api/jwt-token-google/', views.generate_access_token),
    # path('accounts/login-redirect/', views.social_login_redirect, name='login_redirect'),

    path('auth-google/', views.view_name),
    # path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    # For Register API
    path('api/register/', RegisterAPI.as_view(), name='register'),
]


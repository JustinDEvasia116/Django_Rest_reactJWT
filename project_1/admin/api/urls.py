from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from . import views
from .views import MyTokenObtainPairView

urlpatterns = [
    path('dashboard/', views.get_all_users, name='get_all_users'),
    path('admin-token/', MyTokenObtainPairView.as_view(), name='admin-token-obtain'),
    path('admin-token/refresh/', TokenRefreshView.as_view(), name='admin-token-refresh'),
    path('dashboard/block-unblock/', views.block_unblock_user , name='block_unblock_user'),
    path('dashboard/delete-user/<int:user_id>/', views.delete_user, name='delete_user'),
]


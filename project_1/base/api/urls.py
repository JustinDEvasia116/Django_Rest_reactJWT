from django.urls import path
from . import views
from .views import MyTokenObtainPairView,create_account

from rest_framework_simplejwt.views import (
   
    TokenRefreshView,
)

urlpatterns = [
    path('',views.getRoutes),
    path('user/',views.get_user_data),
    path('notes/',views.getNotes),
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('signup/', create_account, name='create_account'),
    path('user/update/',views.update_account, name='update_user_details'),
    
]

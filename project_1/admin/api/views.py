from rest_framework.decorators import api_view , permission_classes
from django.views.decorators.csrf import csrf_exempt
from rest_framework.response import Response
from base.api.serializers import AccountSerializer
from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.permissions import IsAdminUser
from rest_framework.authtoken.models import Token





from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        if user.is_superuser:
            token['is_admin'] = True

        return token

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer



@api_view(['GET'])
def get_all_users(request):
    # Retrieve all users from the User model
    users = User.objects.filter(is_superuser=False)

    # Serialize the users data
    serializer = AccountSerializer(users, many=True)

    # Return the serialized users data as API response
    return Response(serializer.data)


@api_view(['POST'])
def block_unblock_user(request):
    # Get the user_id from the request data
    user_id = request.data.get('user_id')

    try:
        # Retrieve the user from the User model using the user_id
        user = User.objects.get(id=user_id)

        # Perform the block/unblock operation on the user
        if user.is_active:
            user.is_active = False
            message = 'User blocked successfully.'
        else:
            user.is_active = True
            message = 'User unblocked successfully.'
        user.save()

        # Return success response with the appropriate message
        return Response({'message': message}, status=status.HTTP_200_OK)
    except User.DoesNotExist:
        # Return error response if user with given user_id doesn't exist
        return Response({'message': 'User does not exist.'}, status=status.HTTP_404_NOT_FOUND)
    
    
@api_view(['DELETE'])
@csrf_exempt
def delete_user(request, user_id):
    try:
        user = User.objects.get(id=user_id)
        user.delete()
        return Response({'message': 'User deleted successfully!'}, status=status.HTTP_204_NO_CONTENT)
    except User.DoesNotExist:
        return Response({'error': 'User not found!'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

from base.models import *

from rest_framework.serializers import ModelSerializer
from django.contrib.auth.models import User
from rest_framework import serializers

class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id','email', 'password', 'first_name', 'last_name','username','is_active')
        extra_kwargs = {
            'password': {'write_only': True},
        }
    
    def create(self, validated_data):
        email = validated_data.get('email')
        first_name = validated_data.get('first_name')
        last_name = validated_data.get('last_name')
        username = validated_data.get('username')
        password = validated_data.get('password')

        user = User.objects.create_user(
            email=email,
            username=username,
            password=password,
            first_name=first_name,
            last_name=last_name
    )

        return user


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('email', 'first_name', 'last_name')




class NoteSerializer(ModelSerializer):
    class Meta:
        model = Note
        fields = '__all__'
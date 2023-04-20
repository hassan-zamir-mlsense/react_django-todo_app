from rest_framework import serializers
from .models import TodoModel

# For Register/Sign up
from django.contrib.auth.models import User


class TodoModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = TodoModel
        fields = '__all__'


# User Serializers
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        # fields = ('id', 'username', 'email')
        fields = ('id', 'email')


# Register Serializer
class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        # fields = ('username', 'email', 'password')
        fields = ('email', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validation_data):
        # user = User.objects.create(username=validation_data['username'], email=validation_data['email'])
        user = User.objects.create(username=validation_data['email'])
        user.set_password(validation_data["password"])
        user.save()
        return user

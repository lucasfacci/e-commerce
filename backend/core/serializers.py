from django.contrib.auth.hashers import make_password
from rest_framework import serializers
from rest_framework.fields import CharField

from .models import Product, User


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = (
            'id',
            'name',
            'image',
            'description',
            'price',
            'quantity'
        )
        extra_kwargs = {
            'quantity': {'write_only': True},
        }


class UserSerializer(serializers.ModelSerializer):

    password_confirm = CharField(
        style={'input_type': 'password'},
        write_only=True,
        required=True
    )

    class Meta:
        model = User
        fields = (
            'id',
            'username',
            'email',
            'password',
            'password_confirm',
            'first_name',
            'last_name',
            'products'
        )
        extra_kwargs = {
            'email': {'write_only': True, 'required': True},
            'password': {'write_only': True},
        }

    def create(self, validated_data):
        if self.validated_data['password'] != self.validated_data['password_confirm']:
            raise serializers.ValidationError({'password': 'As senhas não são iguais.'})
        validated_data.pop('password_confirm')
        user = User.objects.create_user(**validated_data)
        return user

    def update(self, instance, validated_data):
        if self.validated_data['password'] != self.validated_data['password_confirm']:
            raise serializers.ValidationError({'password': 'As senhas não são iguais.'})
        validated_data.pop('password_confirm')
        if 'password' in validated_data:
            validated_data['password'] = make_password(validated_data['password'])
        return super().update(instance, validated_data)
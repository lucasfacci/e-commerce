from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework import viewsets
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.compat import coreapi, coreschema
from rest_framework.permissions import IsAdminUser
from rest_framework.response import Response
from rest_framework.schemas import coreapi as coreapi_schema
from rest_framework.schemas import ManualSchema

from .models import Category, SubCategory, Product, User
from .permissions import IfAnonPostOnly, IsAdminUserOrReadOnly, IsTheUser
from .serializers import CustomAuthTokenSerializer, CategorySerializer, SubCategorySerializer, ProductSerializer, UserSerializer

# Create your views here.
class CategoryViewSet(viewsets.ModelViewSet):
    """
    Categories
    """
    permission_classes = (
        IsAdminUserOrReadOnly,
    )
    serializer_class = CategorySerializer
    queryset = Category.objects.all()


class SubCategoryViewSet(viewsets.ModelViewSet):
    """
    SubCategories
    """
    permission_classes = (
        IsAdminUserOrReadOnly,
    )
    serializer_class = SubCategorySerializer
    queryset = SubCategory.objects.all()


class ProductViewSet(viewsets.ModelViewSet):
    """
    Products
    """
    permission_classes = (
        IsAdminUserOrReadOnly,
    )
    serializer_class = ProductSerializer
    queryset = Product.objects.all()


class UserViewSet(viewsets.ModelViewSet):
    """
    Users
    """
    permission_classes = (
        IfAnonPostOnly,
        IsTheUser,
    )
    serializer_class = UserSerializer
    queryset = User.objects.all()
    
    def get_permissions(self):
        if self.action == 'list':
            self.permission_classes = [IsAdminUser]
        elif self.action == 'retrieve':
            self.permission_classes = [IsTheUser]
        return super(self.__class__, self).get_permissions()


class CustomObtainAuthToken(ObtainAuthToken):
    
    serializer_class = CustomAuthTokenSerializer

    if coreapi_schema.is_enabled():
        schema = ManualSchema(
            fields=[
                coreapi.Field(
                    name="email",
                    required=True,
                    location='form',
                    schema=coreschema.String(
                        title="Email",
                        description="Valid email for authentication",
                    ),
                ),
                coreapi.Field(
                    name="password",
                    required=True,
                    location='form',
                    schema=coreschema.String(
                        title="Password",
                        description="Valid password for authentication",
                    ),
                ),
            ],
            encoding="application/json",
        )

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data,
                                           context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            'token': token.key,
            'user_id': user.pk,
            'first_name': user.first_name
        })


@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)
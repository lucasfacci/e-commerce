from django.conf import settings
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework import viewsets
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAdminUser

from .models import Product
from .permissions import IfAnonPostOnly, IsAdminUserOrReadOnly, IsTheUser
from .serializers import ProductSerializer, UserSerializer

# Create your views here.
class UserViewSet(viewsets.ModelViewSet):
    """
    Users
    """
    permission_classes = (
        IfAnonPostOnly,
        IsTheUser,
    )
    serializer_class = UserSerializer
    queryset = User.objects.all().order_by('id')
    
    def get_permissions(self):
        if self.action == 'list':
            self.permission_classes = [IsAdminUser]
        elif self.action == 'retrieve':
            self.permission_classes = [IsTheUser]
        return super(self.__class__, self).get_permissions()


class ProductViewSet(viewsets.ModelViewSet):
    """
    Products
    """
    permission_classes = (
        IsAdminUserOrReadOnly,
    )
    serializer_class = ProductSerializer
    queryset = Product.objects.all()


@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)
from rest_framework.routers import DefaultRouter

from .views import UserViewSet, ProductViewSet

router = DefaultRouter()
router.register('users', UserViewSet, basename='users')
router.register('products', ProductViewSet, basename='products')
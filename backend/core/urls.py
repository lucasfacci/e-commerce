from rest_framework.routers import DefaultRouter

from .views import CategoryViewSet, ProductViewSet, UserViewSet

router = DefaultRouter()
router.register('users', UserViewSet, basename='users')
router.register('categories', CategoryViewSet, basename='categories')
router.register('products', ProductViewSet, basename='products')
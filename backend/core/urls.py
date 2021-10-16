from rest_framework.routers import DefaultRouter

from .views import CategoryViewSet, SubCategoryViewSet, ProductViewSet, UserViewSet

router = DefaultRouter()
router.register('users', UserViewSet, basename='users')
router.register('categories', CategoryViewSet, basename='categories')
router.register('subcategories', SubCategoryViewSet, basename='subcategories')
router.register('products', ProductViewSet, basename='products')
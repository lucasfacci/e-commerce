from django.contrib import admin

from .models import Category, Product, User

# Register your models here.
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name',)


class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'description', 'price', 'category', 'quantity', 'created', 'updated', 'active')


class UserAdmin(admin.ModelAdmin):
    list_display = ('username', 'email', 'first_name', 'last_name')
    filter_horizontal = ('products',)


admin.site.register(Category, CategoryAdmin)
admin.site.register(Product, ProductAdmin)
admin.site.register(User, UserAdmin)
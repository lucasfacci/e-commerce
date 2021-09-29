from django.contrib import admin

from .models import Product, User

# Register your models here.
class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'description', 'price', 'quantity', 'created', 'updated', 'active')


class UserAdmin(admin.ModelAdmin):
    list_display = ('username', 'email', 'first_name', 'last_name')
    filter_horizontal = ('products',)


admin.site.register(Product, ProductAdmin)
admin.site.register(User, UserAdmin)
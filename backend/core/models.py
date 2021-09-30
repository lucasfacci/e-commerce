from django.contrib.auth.models import AbstractUser
from django.db import models

# Create your models here.
class Standard(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    active = models.BooleanField(default=True)

    class Meta:
        abstract = True
    

class Category(Standard):
    name = models.CharField(max_length=35)

    class Meta:
        verbose_name = 'Category'
        verbose_name_plural = 'Categories'
        ordering = ['id']

    def __str__(self):
        return f'{self.name}.'


class Product(Standard):
    name = models.CharField(max_length=155)
    image = models.ImageField(upload_to='products/')
    description = models.CharField(max_length=255)
    price = models.DecimalField(max_digits=7, decimal_places=2)
    category = models.ForeignKey(Category, on_delete=models.PROTECT)
    quantity = models.PositiveIntegerField()

    class Meta:
        verbose_name = 'Product'
        verbose_name_plural = 'Products'
        ordering = ['id']

    def __str__(self):
        return f'{self.name}.'


class User(AbstractUser):
    products = models.ManyToManyField(Product, blank=True)

    class Meta:
        verbose_name = 'User'
        verbose_name_plural = 'Users'
        ordering = ['id']

    def __str__(self):
        return f'{self.username}.'
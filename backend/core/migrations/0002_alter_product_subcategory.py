# Generated by Django 3.2.7 on 2021-10-12 03:10

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='subCategory',
            field=models.ForeignKey(blank=True, on_delete=django.db.models.deletion.PROTECT, to='core.subcategory'),
        ),
    ]

from rest_framework import permissions

class IfAnonPostOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.user.is_anonymous:
            if request.method == 'POST':
                return True
            return False
        return True


class IsTheUser(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.user.id == obj.id:
            return True
        return False


class IsAdminUserOrReadOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        return bool(request.user and request.user.is_staff)
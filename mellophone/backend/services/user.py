"""
Handles information retrieval/creation about application users
"""
from django.contrib.auth.models import User


class UserService:
    """
    Handles business logic to creating/retrieving a user
    """

    @staticmethod
    def create_user(email, password, first_name, last_name):
        """
        Creates a new user, with a username matching their email
        """
        User.objects.create_user(
            email,
            email,
            password,
            first_name=first_name,
            last_name=last_name
        )

    @staticmethod
    def get_user_by_serial_id(serial_id):
        """
        Obtains a user by their ID, can throw ObjectDoesNotExist-type errors
        """
        return User.objects.get(pk=serial_id)

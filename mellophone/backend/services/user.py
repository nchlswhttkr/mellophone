from django.contrib.auth.models import User


class UserService:
    """
    Handles logic around creating and retrieving users.
    """

    @staticmethod
    def create_user(email, password, first_name, last_name):
        """
        Creates a new user, with a username matching their email.
        """
        return User.objects.create_user(
            email,  # username is same as email
            email,  # email
            password,
            first_name=first_name,
            last_name=last_name
        )

    @staticmethod
    def get_user_by_id(user_id):
        """
        Obtains a user by their ID, can throw ObjectDoesNotExist-type errors.
        """
        return User.objects.get(pk=user_id)

from django.contrib.auth.models import User
from backend.exceptions import BadRequestException


class UserService:
    """
    Handles logic around creating and retrieving users.

    The main gotcha when interacting directly with Django is that there exists
    both a username and email field - we use the email for both of these, and
    always prefer to use email.
    """

    @staticmethod
    def create(email, password, first_name, last_name):
        if email == "":
            raise BadRequestException("An email must be supplied")
        if password == "":
            raise BadRequestException("A password must be supplied")
        if first_name == "":
            raise BadRequestException("A first name must be supplied")
        if last_name == "":
            raise BadRequestException("A last name must be supplied")

        if User.objects.filter(email=email).exists():
            message = 'The email "{}" is not available.'.format(email)
            raise BadRequestException(message)

        return User.objects.create_user(
            username=email,  # username is same as email
            email=email,  # email
            password=password,
            first_name=first_name,
            last_name=last_name,
        )


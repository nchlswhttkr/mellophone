from django.contrib.auth.models import User


class UserService:
    """
    Handles logic around creating and retrieving users.

    The main gotcha when interacting directly with Django is that there exists
    both a username and email field - we use the email for both of these, and
    always prefer to use email.
    """

    @staticmethod
    def create_user(email, password, first_name, last_name):
        """
        Creates a new user, with a username matching their email.
        """
        if email == "":
            raise InvalidUserDetailsException("An email must be supplied.")
        if password == "":
            raise InvalidUserDetailsException("A password must be supplied.")
        if first_name == "":
            raise InvalidUserDetailsException("A first name must be supplied.")
        if last_name == "":
            raise InvalidUserDetailsException("A last name must be supplied.")

        if User.objects.filter(email=email).exists():
            message = "The email \"{}\" is not available.".format(email)
            raise EmailAlreadyInUseException(message)

        return User.objects.create_user(
            email,  # username is same as email
            email,  # email
            password,
            first_name=first_name,
            last_name=last_name
        )


class InvalidUserDetailsException(Exception):
    pass


class EmailAlreadyInUseException(Exception):
    pass

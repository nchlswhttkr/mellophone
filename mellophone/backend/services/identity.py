from django.contrib.auth import authenticate, login, logout
from backend.services.user import UserService
from backend.exceptions import AuthenticationRequiredException, BadRequestException


class IdentityService:
    """
    Implements all identity-related logic, usually about the current user and
    their current session (whether they are authenticated).
    """

    @staticmethod
    def sign_up(request, email, password, first_name, last_name):
        """
        Creates an account and signs the user in.
        """

        UserService.create(email, password, first_name, last_name)
        return IdentityService.sign_in(request, email, password)

    @staticmethod
    def sign_in(request, email, password):
        """
        Attempt to log a user in given their credentials, throwing if
        authentication fails.
        """
        user = authenticate(request, username=email, password=password)
        if user is None:
            raise BadRequestException("Sign in failed")

        login(request, user)
        return user

    @staticmethod
    def sign_out(request):
        """
        End the current session, succeeding even if a session does not exist.
        """
        logout(request)

    @staticmethod
    def get_session_user(request):
        """
        Will return a user's identity if they are authenticated in the current
        session, otherwise None if no user is authenticated.
        """
        if request.user.is_authenticated:
            return request.user
        return None

    @staticmethod
    def get_required_session_user(request):
        """
        Will return a user's identity if they are authenticated, but will throw
        if no user is authenticated.

        This can be used to as the first step in handling a request, stopping
        users who are not authenticating from proceeding.
        """
        user = IdentityService.get_session_user(request)
        if user is None:
            raise AuthenticationRequiredException(
                "You are not logged in, authentication is required."
            )
        return user

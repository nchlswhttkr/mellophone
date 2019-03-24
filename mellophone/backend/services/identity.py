"""
Implements all identity-related logic, usually about the current user and their
current session (whether they are authenticated)
"""

from django.contrib.auth import authenticate, login, logout


class IdentityService:
    """
    Processes authentication-related requests for the current session
    """

    @staticmethod
    def sign_in(request, email, password):
        """
        Attempt to log a user in given their credentials.
        """
        user = authenticate(request, username=email, password=password)

        if user is not None:
            login(request, user)

    @staticmethod
    def sign_out(request):
        """
        End the current authenticated session, will succeed even if a session does
        not exist
        """
        logout(request)

    @staticmethod
    def get_session_user(request):
        """
        Will return a user's identity if they are authenticated in the current
        session, otherwise returns None
        """
        if request.user.is_authenticated:
            return request.user

        return None

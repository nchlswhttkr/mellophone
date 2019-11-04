from django.test import TestCase, RequestFactory
from django.contrib.sessions.middleware import SessionMiddleware
from django.contrib.auth.middleware import AuthenticationMiddleware
from backend.services.identity import IdentityService
from backend.exceptions import AuthenticationRequiredException


class IdentityServiceTestCase(TestCase):
    def setUp(self):
        self.request_factory = RequestFactory()

    def test_newly_authenticated_user_is_authenticated(self):
        """
        This exists to catch an edge case where a user would be created but
        could not be authenticated against.

        Using User.objects.create(...) instead of User.objects.create_user(...)
        will not throw an error, but the created user can't be authenticated
        against.

        Who knows what Django does internally that's different from manually
        adding a user? Just don't delete this test.
        """
        email = "john@email.com"

        # Django does not include middleware in tests, so add it manually
        # The request can be nondescript because it's just to satisfy Django
        request = self.request_factory.get("/")
        SessionMiddleware().process_request(request)
        AuthenticationMiddleware().process_request(request)

        user = IdentityService.sign_up(request, email, "hunter2", "John", "Doe")

        self.assertTrue(user is not None)
        self.assertEqual(user.email, email)

    def test_can_stop_users_from_proceeding_if_not_logged_in(self):
        """
        Several routes depend on a method to get the session user that will
        throw if no request user is logged in.
        """
        request = self.request_factory.get("/")
        SessionMiddleware().process_request(request)
        AuthenticationMiddleware().process_request(request)

        with self.assertRaises(AuthenticationRequiredException):
            IdentityService.get_required_session_user(request)

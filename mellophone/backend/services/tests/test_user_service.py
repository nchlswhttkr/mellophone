from django.test import TestCase
from django.db.utils import IntegrityError
from backend.models import User
from backend.services.user import UserService


class UserServiceTestCase(TestCase):
    user_service = UserService()

    def test_create_user(self):
        """
        Should create a new user that does not currently exist.

        It should not be possible to create a user with the same email
        (username) after this.
        """

        email = "john@email.com"
        password = "hunter2"
        first_name = "John"
        last_name = "Doe"

        self.assertFalse(
            User.objects.filter(email=email).exists(),
            "The new user should not already exist"
        )

        user = self.user_service.create_user(
            email, password, first_name, last_name)

        self.assertEqual(User.objects.filter(email=email).count(), 1,
                         "A user should have been created")
        self.assertNotEqual(
            user, None, "UserService.create_user() must return a user instance")
        self.assertEqual(user.email, email,
                         "The user must have a matching email")
        self.assertEqual(user.first_name, first_name,
                         "The user must have a matching first name")
        self.assertEqual(user.last_name, last_name,
                         "The user must have a matching last name")

        def create_user_when_already_exists():
            self.user_service.create_user(
                email, password, first_name, last_name)

        self.assertRaises(IntegrityError, create_user_when_already_exists)

    def test_create_new_user(self):
        """Should create and retrieve a given user"""

        email = "john@email.com"
        password = "hunter2"
        first_name = "John"
        last_name = "Doe"

        self.assertFalse(User.objects.filter(email=email).exists(),
                         'The  user should not initially exist')

        user_id = self.user_service.create_user(
            email, password, first_name, last_name).id

        user = self.user_service.get_user_by_id(user_id)

        self.assertNotEqual(user, None, "A user should be returned")
        self.assertEqual(user.email, email,
                         "The user should have a matching email")
        self.assertEqual(user.first_name, first_name,
                         "The user should have a matching first name")
        self.assertEqual(user.last_name, last_name,
                         "The user should have a matching last name")

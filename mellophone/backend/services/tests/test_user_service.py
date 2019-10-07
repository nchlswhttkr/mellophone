from django.test import TestCase
from backend.models import User
from backend.services.user import UserService, EmailAlreadyInUseException, InvalidUserDetailsException


class UserServiceTestCase(TestCase):
    user_service = UserService()

    def test_create_user(self):
        """
        A user can be created.
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
                         "A single user should have been created")
        self.assertNotEqual(
            user, None, "UserService.create_user() must return a user instance")
        self.assertEqual(user.email, email,
                         "The user must have a matching email")
        self.assertEqual(user.first_name, first_name,
                         "The user must have a matching first name")
        self.assertEqual(user.last_name, last_name,
                         "The user must have a matching last name")

    def test_cannot_create_user_with_taken_email(self):
        """
        If an email is in use by another user when signing up, it should throw
        an error.
        """
        email = "taken@email.com"

        UserService.create_user(email, "-", "-", "-")

        def create_user_when_already_exists():
            UserService.create_user(email, "-", "-", "-")

        self.assertRaises(EmailAlreadyInUseException,
                          create_user_when_already_exists)

    def test_cannot_create_user_with_empty_fields(self):
        """
        All fields must be non-empty strings, otherwise the user creation
        should fail.
        """
        email = "john@email.com"
        password = "hunter2"
        first_name = "John"
        last_name = "Doe"

        with self.assertRaises(InvalidUserDetailsException, msg="An email must be supplied"):
            UserService.create_user("", password, first_name, last_name)
        with self.assertRaises(InvalidUserDetailsException, msg="A password must be supplied"):
            UserService.create_user(email, "", first_name, last_name)
        with self.assertRaises(InvalidUserDetailsException, msg="A first name must be supplied"):
            UserService.create_user(email, password, "", last_name)
        with self.assertRaises(InvalidUserDetailsException, msg="A last name must be supplied"):
            UserService.create_user(email, password, first_name, "")

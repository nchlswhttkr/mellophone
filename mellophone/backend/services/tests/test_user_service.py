from django.test import TestCase
from backend.models import User
from backend.services.user import UserService
from backend.exceptions import BadRequestException


class UserServiceTestCase(TestCase):
    def test_create(self):
        """
        A user can be created.
        """
        email = "john@email.com"
        password = "hunter2"
        first_name = "John"
        last_name = "Doe"
        user = UserService.create(email, password, first_name, last_name)

        self.assertNotEqual(user, None)
        self.assertEqual(user.email, email)
        self.assertEqual(user.first_name, first_name)
        self.assertEqual(user.last_name, last_name)

    def test_cannot_create_with_taken_email(self):
        """
        If an email is in use by another user when signing up, it should throw
        an error.
        """
        email = "taken@email.com"

        UserService.create(email, "-", "-", "-")

        with self.assertRaises(
            BadRequestException, msg="The email {} is already in use".format(email)
        ):
            UserService.create(email, "-", "-", "-")

    def test_cannot_create_with_empty_fields(self):
        """
        All fields must be non-empty strings, otherwise the user creation
        should fail.
        """
        email = "john@email.com"
        password = "hunter2"
        first_name = "John"
        last_name = "Doe"

        with self.assertRaises(BadRequestException, msg="An email must be supplied"):
            UserService.create("", password, first_name, last_name)
        with self.assertRaises(BadRequestException, msg="A password must be supplied"):
            UserService.create(email, "", first_name, last_name)
        with self.assertRaises(
            BadRequestException, msg="A first name must be supplied"
        ):
            UserService.create(email, password, "", last_name)
        with self.assertRaises(BadRequestException, msg="A last name must be supplied"):
            UserService.create(email, password, first_name, "")

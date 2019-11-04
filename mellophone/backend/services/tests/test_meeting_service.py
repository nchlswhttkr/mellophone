from django.test import TestCase
from backend.services.team import TeamService
from backend.services.meeting import MeetingService
from backend.services.user import UserService
from backend.exceptions import BadRequestException


class ItemServiceTestCase(TestCase):
    def setUp(self):
        self.user = UserService.create("john@email.com", "hunter2", "John", "Doe")
        self.team = TeamService.create_team_with_user_as_owner(
            self.user, "John's Team", ""
        )

    def test_create(self):
        """
        A meeting can be created
        """

        meeting_name = "A meeting"
        meeting_venue = "A meeting venue"
        meeting = MeetingService.create(self.team.id, meeting_name, meeting_venue)

        self.assertEqual(meeting.name, meeting_name)
        self.assertEqual(meeting.venue, meeting_venue)

    def test_create_meeting_without_venue(self):
        """
        A meeting can be created without a venue being provided, defaulting to
        an empty string
        """
        meeting_name = "A meeting"
        meeting = MeetingService.create(self.team.id, meeting_name)

        self.assertEqual(meeting.name, meeting_name)
        self.assertEqual(meeting.venue, "")

    def test_create_meeting_throws_if_empty_name(self):
        """
        A meeting must have a name, an empty string is not accepted.
        """
        with self.assertRaises(BadRequestException, msg="A meeting must have a name"):
            MeetingService.create(self.team.id, "", "-")

    def test_retrieve_meeting(self):
        """
        A meeting can be retrieved
        """
        meeting_name = "A meeting"
        meeting = MeetingService.create(self.team.id, meeting_name)

        retrieved_meeting = MeetingService.get(meeting.id)

        self.assertEqual(retrieved_meeting.id, meeting.id)
        self.assertEqual(retrieved_meeting.name, meeting_name)

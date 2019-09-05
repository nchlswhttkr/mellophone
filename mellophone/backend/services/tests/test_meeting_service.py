from django.test import TestCase
from backend.services.team import TeamService
from backend.services.meeting import MeetingService
from backend.services.user import UserService


class ItemServiceTestCase(TestCase):

    def test_create_meeting(self):
        """
        A meeting can be created
        """
        user = UserService.create_user(
            "john@email.com", "hunter2", "John", "Doe")
        team = TeamService.create_team_with_user_as_owner(
            user, "A team", "")

        meeting_name = "A meeting"
        meeting_venue = "A meeting venue"
        meeting = MeetingService.create_meeting_for_team_with_id(
            team.id, meeting_name, meeting_venue)

        self.assertEqual(meeting.name, meeting_name)
        self.assertEqual(meeting.venue, meeting_venue)

    def test_create_meeting_without_venue(self):
        """
        A meeting can be created without a venue being provided, defaulting to
        an empty string
        """
        user = UserService.create_user(
            "john@email.com", "hunter2", "John", "Doe")
        team = TeamService.create_team_with_user_as_owner(
            user, "A team", "")

        meeting_name = "A meeting"
        meeting = MeetingService.create_meeting_for_team_with_id(
            team.id, meeting_name)

        self.assertEqual(meeting.name, meeting_name)
        self.assertEqual(meeting.venue, "")

    def test_retrieve_meeting(self):
        """
        A meeting can be retrieved
        """
        user = UserService.create_user(
            "john@email.com", "hunter2", "John", "Doe")
        team = TeamService.create_team_with_user_as_owner(
            user, "A team", "")

        meeting_name = "A meeting"
        meeting = MeetingService.create_meeting_for_team_with_id(
            team.id, meeting_name)

        retrieved_meeting = MeetingService.get_meeting_with_id(meeting.id)

        self.assertEqual(retrieved_meeting.id, meeting.id)
        self.assertEqual(retrieved_meeting.name, meeting_name)

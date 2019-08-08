from django.test import TestCase
from backend.services.item import ItemService, InvalidItemException
from backend.services.team import TeamService
from backend.services.meeting import MeetingService
from backend.services.user import UserService


class ItemServiceTestCase(TestCase):

    def test_get_items_of_meeting(self):
        """
        All the items of a meeting can be created and retreived
        """
        user = UserService.create_user(
            "john@email.com", "hunter2", "John", "Doe")
        team = TeamService.create_team_with_user_as_owner(
            user, "Me and the boys", "")
        meeting = MeetingService.create_meeting_for_team_with_id(
            team.id, "A meeting")

        item_name = "An item name"
        item_description = "A description for the item"
        ItemService.create_item_for_meeting(
            meeting, item_name, item_description)

        # items are ordered by most recently created/updated, which should be
        # the reversed order of insertion
        retrieved_item = ItemService.get_items_of_meeting_with_id(
            meeting.id)[0]

        self.assertEqual(meeting.id, retrieved_item.meeting.id)
        self.assertEqual(item_name, retrieved_item.name)
        self.assertEqual(item_description, retrieved_item.description)

    def test_throws_if_no_name(self):
        user = UserService.create_user(
            "john@email.com", "hunter2", "John", "Doe")
        team = TeamService.create_team_with_user_as_owner(
            user, "Me and the boys", "")
        meeting = MeetingService.create_meeting_for_team_with_id(
            team.id, "A meeting")

        with self.assertRaises(InvalidItemException):
            ItemService.create_item_for_meeting(
                meeting, "", "A description")

    def test_throws_if_no_description(self):
        user = UserService.create_user(
            "john@email.com", "hunter2", "John", "Doe")
        team = TeamService.create_team_with_user_as_owner(
            user, "Me and the boys", "")
        meeting = MeetingService.create_meeting_for_team_with_id(
            team.id, "A meeting")

        with self.assertRaises(InvalidItemException):
            ItemService.create_item_for_meeting(meeting, "A name", "")

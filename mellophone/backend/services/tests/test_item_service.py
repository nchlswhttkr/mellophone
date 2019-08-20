from time import sleep
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

    def test_ordered_by_creation_date(self):
        """
        Items of a meeting are ordered by the date on which they are created.
        """
        user = UserService.create_user(
            "john@email.com", "hunter2", "John", "Doe")
        team = TeamService.create_team_with_user_as_owner(
            user, "Me and the boys", "")
        meeting = MeetingService.create_meeting_for_team_with_id(
            team.id, "A meeting")

        first_item = ItemService.create_item_for_meeting(
            meeting, "First item", "-")
        sleep(1)  # not necessary, but just for clarity's sake
        second_item = ItemService.create_item_for_meeting(
            meeting, "Second item", "-")
        meeting_items = ItemService.get_items_of_meeting_with_id(meeting.id)

        self.assertTrue(first_item.date_created < second_item.date_created)
        self.assertEqual(len(meeting_items), 2)
        self.assertEqual(meeting_items[0].name, first_item.name)
        self.assertEqual(meeting_items[1].name, second_item.name)

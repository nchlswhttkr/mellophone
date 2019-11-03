from time import sleep
from django.test import TestCase
from backend.services.item import ItemService
from backend.services.team import TeamService
from backend.services.meeting import MeetingService
from backend.services.user import UserService
from backend.exceptions import BadRequestException


class ItemServiceTestCase(TestCase):
    def setUp(self):
        self.user = UserService.create("john@email.com", "hunter2", "John", "Doe")
        self.team = TeamService.create_team_with_user_as_owner(
            self.user, "John's team", ""
        )
        self.meeting = MeetingService.create(self.team.id, "A meeting")

    def test_get_items_of_meeting(self):
        """
        All the items of a meeting can be created and retreived
        """
        item_name = "An item name"
        item_description = "A description for the item"

        ItemService.create(self.meeting.id, item_name, item_description)
        retrieved_item = ItemService.get_items_of_meeting_with_id(self.meeting.id)[0]

        self.assertEqual(self.meeting.id, retrieved_item.meeting.id)
        self.assertEqual(item_name, retrieved_item.name)
        self.assertEqual(item_description, retrieved_item.description)

    def test_throws_if_no_name(self):
        with self.assertRaises(
            BadRequestException, msg="Meeting items must have a name"
        ):
            ItemService.create(self.meeting.id, "", "Description")

    def test_throws_if_no_description(self):
        with self.assertRaises(
            BadRequestException, msg="Meeting items must have a description"
        ):
            ItemService.create(self.meeting.id, "Name", "")

    def test_ordered_by_creation_date(self):
        """
        Items of a meeting are ordered by the date on which they are created.
        """
        first_item = ItemService.create(self.meeting.id, "First item", "-")
        sleep(1)  # just so the second item is explicity older
        second_item = ItemService.create(self.meeting.id, "Second item", "-")
        meeting_items = ItemService.get_items_of_meeting_with_id(self.meeting.id)

        self.assertTrue(first_item.date_created < second_item.date_created)
        self.assertEqual(len(meeting_items), 2)
        self.assertEqual(meeting_items[0].name, first_item.name)
        self.assertEqual(meeting_items[1].name, second_item.name)

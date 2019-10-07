from backend.models import Item


class ItemService:
    """
    Handles logic around the creation, retrieval and updating of meeting items.
    """

    @staticmethod
    def get_items_of_meeting_with_id(meeting_id):
        """
        Retrieves items associated with a given meeting.
        """
        return Item.objects.filter(meeting__id=meeting_id).order_by("date_created")

    @staticmethod
    def create_item_for_meeting(meeting, name, description):
        """
        Creates an item for a meeting.
        """
        if name == "":
            raise InvalidItemException("Meeting items must have a name.")
        if description == "":
            raise InvalidItemException("Meeting items must have a description")

        item = Item.objects.create(name=name, description=description, meeting=meeting)
        return item


class InvalidItemException(Exception):
    pass

from backend.models import Item
from backend.exceptions import BadRequestException


class ItemService:
    @staticmethod
    def get(id):
        return Item.objects.get(pk=id)

    @staticmethod
    def create(meeting_id, name, description):
        if name == "":
            raise BadRequestException("Meeting items must have a name")
        if description == "":
            raise BadRequestException("Meeting items must have a description")

        item = Item.objects.create(
            name=name, description=description, meeting_id=meeting_id
        )
        return item

    @staticmethod
    def get_items_of_meeting_with_id(meeting_id):
        """
        Retrieves items associated with a given meeting.
        """
        return Item.objects.filter(meeting__id=meeting_id).order_by("date_created")

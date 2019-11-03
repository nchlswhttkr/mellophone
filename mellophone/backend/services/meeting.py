from backend.models import Meeting
from backend.exceptions import BadRequestException


class MeetingService:
    @staticmethod
    def create(team_id, name, venue=""):
        """
        Creates a meeting for the given team.
        """
        if name == "":
            raise BadRequestException("Meetings must have a name")
        return Meeting.objects.create(team_id=team_id, name=name, venue=venue)

    @staticmethod
    def get(meeting_id):
        """
        Retrieves a meeting by its ID.
        """
        return Meeting.objects.get(pk=meeting_id)

    @staticmethod
    def get_meetings_of_team_with_id(team_id):
        return Meeting.objects.filter(team__id=team_id)

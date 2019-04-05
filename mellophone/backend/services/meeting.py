from django.db import transaction
from backend.models import Meeting


class MeetingService:
    """
    Handles logic around the creation, retrieval and updating of meetings.
    """
    @staticmethod
    @transaction.atomic
    def create_meeting(team_id, name, venue=None):
        """
        Creates a meeting
        """
        with transaction.atomic():
            meeting = Meeting.objects.create(
                team_id=team_id, name=name, venue=venue)
        return meeting

    @staticmethod
    def get_meeting_with_id(meeting_id):
        """
        Retrieves a meeting by its ID.
        """
        return Meeting.objects.get(pk=meeting_id)

    @staticmethod
    def get_meetings_of_team(team_id):
        return Meeting.objects.filter(team__id=team_id)

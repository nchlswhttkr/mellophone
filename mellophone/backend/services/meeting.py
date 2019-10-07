from backend.models import Meeting


class MeetingService:
    """
    Handles logic around the creation, retrieval and updating of meetings.
    """

    @staticmethod
    def create_meeting_for_team_with_id(team_id, name, venue=""):
        """
        Creates a meeting for the given team.
        """
        return Meeting.objects.create(team_id=team_id, name=name, venue=venue)

    @staticmethod
    def get_meeting_with_id(meeting_id):
        """
        Retrieves a meeting by its ID.
        """
        return Meeting.objects.get(pk=meeting_id)

    @staticmethod
    def get_meetings_of_team_with_id(team_id):
        return Meeting.objects.filter(team__id=team_id)

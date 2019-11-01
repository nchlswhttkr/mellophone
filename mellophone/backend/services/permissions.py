from backend.services.membership import MembershipService
from backend.services.meeting import MeetingService


class PermissionsService:
    """
    Abstracts logic around permission checking. Each method should be about
    CRUDing a certain resource (eg READing a Meeting).

    The intent is to group and abstract logic around permission checking so
    that it can be changed from a single place in future.
    """

    @staticmethod
    def can_write_meetings_of_team(user_id, team_id):
        return MembershipService.is_user_member_of_team(user_id, team_id)

    @staticmethod
    def can_read_meetings_of_team(user_id, team_id):
        return MembershipService.is_user_member_of_team(user_id, team_id)

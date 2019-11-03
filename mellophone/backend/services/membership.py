from backend.models import Membership


class MembershipService:
    @staticmethod
    def create(user_id, team_id):
        return Membership.objects.create(user_id=user_id, team_id=team_id)

    @staticmethod
    def get(membership_id):
        return Membership.objects.filter(pk=id)

    @staticmethod
    def delete(membership):
        membership.delete()

    @staticmethod
    def is_user_member_of_team(user_id, team_id):
        return Membership.objects.filter(user__id=user_id, team__id=team_id).exists()

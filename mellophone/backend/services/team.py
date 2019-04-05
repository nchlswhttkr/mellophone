from django.db import transaction
from backend.models import Team, Membership


class TeamService:
    """
    Handle logic around creating and retrieving a team or set of teams.
    """

    @staticmethod
    def get_teams_of_user(user):
        """
        Lists all teams of which the given user is a member.
        """
        return Team.objects.filter(membership__user__id=user.id)

    @staticmethod
    @transaction.atomic
    def create_team_with_owner(owner, name, website):
        """
        Creates a new team, assigning the given user as an member (eventually
        they will be owner when roles are added in future).
        """
        with transaction.atomic():
            team = Team(name=name, website=website)
            team.save()
            membership = Membership(team=team, user=owner)
            membership.save()
        return team

    @staticmethod
    def get_team_with_id(team_id):
        """
        Retrieve information about a given team.
        """
        return Team.objects.get(pk=team_id)

    @staticmethod
    def is_user_in_team(user, team_id):
        """
        Confirm that the a user is a member of a team.
        """
        return Membership.objects.filter(user=user, team__id=team_id).exists()

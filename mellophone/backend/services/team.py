"""
Handles information retrieval/creation about teams
"""
from django.db import transaction
from backend.models import Team, Membership


class TeamService:
    """
    Handles business logic to creating/retrieving teams
    """

    @staticmethod
    def get_teams_of_user(user):
        """
        Finds all teams of which the given user is a member
        """
        query = Team.objects.filter(membership__user__id=user.id)
        return [team for team in query.values()]

    @staticmethod
    @transaction.atomic
    def create_team_with_owner(owner, name, website):
        """
        Creates a new team, assigning the given user as an member (eventually
        they will be owner when roles are added in future)
        """
        with transaction.atomic():
            team = Team(name=name, website=website)
            team.save()
            membership = Membership(team=team, user=owner)
            membership.save()
            return team

from django.db import transaction
from backend.models import Team
from backend.services.membership import MembershipService
from backend.exceptions import BadRequestException


class TeamService:
    @staticmethod
    def create_team(name, website):
        if name == "":
            raise BadRequestException("Teams must have a name")
        return Team.objects.create(name=name, website=website)

    @staticmethod
    def get(id):
        return Team.objects.get(pk=id)

    @staticmethod
    def get_teams_of_user_with_id(user_id):
        # Django allows reverse lookups on relationships
        # https://docs.djangoproject.com/en/dev/topics/db/queries/#lookups-that-span-relationships
        return Team.objects.filter(membership__user__id=user_id)

    @staticmethod
    @transaction.atomic
    def create_team_with_user_as_owner(user, name, website):
        """
        Creates a new team, assigning the given user as an member (eventually
        they will be owner when roles are added in future).
        """
        with transaction.atomic():
            team = TeamService.create_team(name=name, website=website)
            MembershipService.create(user.id, team.id)
        return team

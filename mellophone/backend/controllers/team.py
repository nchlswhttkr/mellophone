import re
import json
from django.http.response import JsonResponse
from backend.views import GenericViews
from backend.serializers import serialize_team
from backend.services.identity import IdentityService
from backend.services.team import TeamService


class TeamController:
    """
    All requests matching /api/teams/... should be routed through here.
    """

    def get_teams_of_user(self, request):
        """
        Get the teams of which the session user is a member.
        """
        user = IdentityService.get_required_session_user(request)

        teams = TeamService.get_teams_of_user_with_id(user.id)
        return JsonResponse(
            {"teams": [serialize_team(team) for team in teams]}, status=200
        )

    def create_team(self, request):
        """
        Create a new team, with the session user as a member.

        If roles are implemented, this may also include asssigning them as an
        'owner'-like role.
        """
        user = IdentityService.get_required_session_user(request)
        body = json.loads(request.body.decode("utf-8"))
        name = body["name"]
        website = body["website"]

        team = TeamService.create_team_with_user_as_owner(user, name, website)
        return JsonResponse({"team": serialize_team(team)}, status=201)

    def get_team_by_id(self, request):
        """
        Get a team by their ID.
        """
        user = IdentityService.get_required_session_user(request)
        team_id = re.match(r"/api/teams/([0-9]*)", request.path)[1]

        team = TeamService.get(team_id)
        return JsonResponse({"team": serialize_team(team)}, status=200)

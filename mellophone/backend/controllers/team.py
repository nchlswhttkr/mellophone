import re
import json
from django.http.response import JsonResponse
from backend.views.generic import GenericViews
from backend.serializers import serialize_team


class TeamController:
    """
    All requests matching /api/teams/... should be routed through here.
    """

    def __init__(self, identity_service, team_service, meeting_service):
        self._identity_service = identity_service
        self._team_service = team_service
        self._meeting_service = meeting_service

    def get_teams_of_user(self, request):
        """
        Get the teams of which the session user is a member.
        """
        user = self._identity_service.get_session_user(request)
        if user is None:
            return GenericViews.authentication_required_response(request)

        teams = self._team_service.get_teams_of_user(user)
        return JsonResponse(
            {"teams": [serialize_team(team) for team in teams]},
            status=200
        )

    def create_team(self, request):
        """
        Create a new team, with the session user as a member.

        If roles are implemented, this may also include asssigning them as an
        'owner'-like role.
        """
        owner = self._identity_service.get_session_user(request)
        if owner is None:
            return GenericViews.authentication_required_response(request)

        body = json.loads(request.body.decode("utf-8"))
        name = body["name"]
        website = body["website"]

        team = self._team_service.create_team_with_user_as_owner(
            owner, name, website)
        return JsonResponse({"team": serialize_team(team)}, status=201)

    def get_team_by_id(self, request):
        """
        Get a team by their ID.
        """
        user = self._identity_service.get_session_user(request)
        if user is None:
            return GenericViews.authentication_required_response(request)

        team_id = re.match(r"/api/teams/([0-9]*)", request.path)[1]

        team = self._team_service.get_team_with_id(team_id)

        return JsonResponse({"team": serialize_team(team)}, status=200)

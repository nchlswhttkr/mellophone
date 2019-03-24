"""
Handles team-related routes
"""

import re
import json
from django.http.response import JsonResponse
from backend.services.identity import IdentityService
from backend.services.team import TeamService


class TeamController:
    """
    All requests matching /api/teams/... should be routed through here
    """

    @staticmethod
    def process_request(request):
        """
        Passes of the request to the relevant route handler
        """
        path, method = request.path, request.method

        if re.match(r"/api/teams", path) and method == "GET":
            return TeamController.get_teams(request)

        if re.match(r"/api/teams", path) and method == "POST":
            return TeamController.create_team(request)

        return JsonResponse({}, status=404)

    @staticmethod
    def get_teams(request):
        """
        Get the teams of which the session user is a member
        """
        user = IdentityService.get_session_user(request)
        if user is None:
            return JsonResponse({}, status=403)

        teams = TeamService.get_teams_of_user(user)
        return JsonResponse({"teams": teams}, status=200)

    @staticmethod
    def create_team(request):
        """
        Create a new team, with the session user as a member

        If roles are implemented, this may also include asssigning them as an
        'owner'-like role
        """
        owner = IdentityService.get_session_user(request)
        if owner is None:
            return JsonResponse({}, status=403)

        body = json.loads(request.body.decode("utf-8"))
        name = body["name"]
        website = body["website"]

        team = TeamService.create_team_with_owner(owner, name, website)
        return JsonResponse({"team": team}, status=201)

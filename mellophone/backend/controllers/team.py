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
        GET /teams to get the teams the session user is a member of
        POST /teams to create a new team with the session user as a member
        """
        path, method = request.path, request.method

        if re.match(r"/api/teams", path) and method == "GET":
            user = IdentityService.get_session_user(request)
            if user is None:
                return JsonResponse({}, status=403)

            teams = TeamService.get_teams_of_user(user)
            return JsonResponse({"teams": teams}, status=200)

        if re.match(r"/api/teams", path) and method == "POST":
            owner = IdentityService.get_session_user(request)
            if owner is None:
                return JsonResponse({}, status=403)

            body = json.loads(request.body.decode("utf-8"))
            name = body["name"]
            website = body["website"]

            team = TeamService.create_team_with_owner(owner, name, website)
            return JsonResponse({"team": team}, status=201)

        return JsonResponse({}, status=404)

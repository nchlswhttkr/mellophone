import re
import json
from django.http.response import JsonResponse
from backend.services.identity import IdentityService
from backend.services.team import TeamService
from backend.services.meeting import MeetingService
from backend.views.generic import GenericViews
from backend.serializers import serialize_team, serialize_meeting


class TeamController:
    """
    All requests matching /api/teams/... should be routed through here.
    """

    @staticmethod
    def process_request(request):
        """
        Passes of the request to the relevant route handler.
        """
        path, method = request.path, request.method

        if re.fullmatch(r"/api/teams", path) and method == "GET":
            return TeamController.get_teams(request)

        if re.fullmatch(r"/api/teams$", path) and method == "POST":
            return TeamController.create_team(request)

        if re.fullmatch(r"/api/teams/[0-9]*", path) and method == "GET":
            return TeamController.get_team(request)

        if (re.fullmatch(r"/api/teams/[0-9]*/meetings", path)
                and method == "POST"):
            return TeamController.create_meeting(request)

        if (re.fullmatch(r"/api/teams/[0-9]*/meetings", path)
                and method == "GET"):
            return TeamController.get_meetings_of_team(request)

        return GenericViews.not_found_response(request)

    @staticmethod
    def get_teams(request):
        """
        Get the teams of which the session user is a member.
        """
        user = IdentityService.get_session_user(request)
        if user is None:
            return GenericViews.authentication_required_response(request)

        teams = TeamService.get_teams_of_user(user)
        return JsonResponse(
            {"teams": [serialize_team(team) for team in teams]},
            status=200
        )

    @staticmethod
    def create_team(request):
        """
        Create a new team, with the session user as a member.

        If roles are implemented, this may also include asssigning them as an
        'owner'-like role.
        """
        owner = IdentityService.get_session_user(request)
        if owner is None:
            return GenericViews.authentication_required_response(request)

        body = json.loads(request.body.decode("utf-8"))
        name = body["name"]
        website = body["website"]

        team = TeamService.create_team_with_owner(owner, name, website)
        return JsonResponse({"team": serialize_team(team)}, status=201)

    @staticmethod
    def get_team(request):
        """
        Get a team by their ID.
        """
        user = IdentityService.get_session_user(request)
        if user is None:
            return GenericViews.authentication_required_response(request)

        team_id = re.match(r"/api/teams/([0-9]*)", request.path)[1]

        team = TeamService.get_team_with_id(team_id)

        return JsonResponse({"team": serialize_team(team)}, status=200)

    @staticmethod
    def create_meeting(request):
        """
        Creates a meeting for the current team.
        """
        user = IdentityService.get_session_user(request)
        if user is None:
            return GenericViews.authentication_required_response(request)

        body = json.loads(request.body.decode("utf-8"))
        name = body["name"]
        venue = body["venue"] if "venue" in body else None

        team_id = re.match(r"/api/teams/([0-9]*)/meetings", request.path)[1]
        meeting = MeetingService.create_meeting(team_id, name, venue=venue)

        return JsonResponse({"meeting": serialize_meeting(meeting)}, status=201)

    @staticmethod
    def get_meetings_of_team(request):
        """
        Gets the meetings of a given team
        """
        user = IdentityService.get_session_user(request)
        if user is None:
            return GenericViews.authentication_required_response(request)

        team_id = re.match(r"/api/teams/([0-9]*)/meetings", request.path)[1]
        meetings = MeetingService.get_meetings_of_team(team_id)

        return JsonResponse(
            {
                "meetings": [
                    serialize_meeting(meeting) for meeting in meetings
                ]
            },
            status=200
        )

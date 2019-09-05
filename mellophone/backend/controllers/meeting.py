import re
import json
from django.http.response import JsonResponse
from backend.views import GenericViews
from backend.serializers import serialize_meeting, serialize_item
from backend.services.identity import IdentityService
from backend.services.team import TeamService
from backend.services.meeting import MeetingService
from backend.services.item import ItemService, InvalidItemException


class MeetingController:
    """
    All requests matching /api/meetings/... should be routed through here.
    """

    def get_meeting_by_id(self, request):
        """
        Returns a given meeting and the team that held it, requires the session
        user be a member of said team.

        To check team membership (and thus permission to read meetings), it's
        fine to get the team ID from the meeting itself for now, as retreiving
        meetings is not a particularly expensive operation.
        """
        user = IdentityService.get_session_user(request)
        if user is None:
            return GenericViews.authentication_required_response(request)

        meeting_id = int(re.match(r"/api/meetings/([0-9]*)", request.path)[1])
        meeting = MeetingService.get_meeting_with_id(meeting_id)

        if not TeamService.is_user_in_team_with_id(user, meeting.team.id):
            return GenericViews.forbidden_response(request)

        return JsonResponse(
            {"meeting": serialize_meeting(meeting)},
            status=200
        )

    def get_meetings_of_team(self, request):
        """
        Gets the meetings of a given team.
        """
        user = IdentityService.get_session_user(request)
        if user is None:
            return GenericViews.authentication_required_response(request)

        team_id = re.match(r"/api/teams/([0-9]*)/meetings", request.path)[1]

        if not TeamService.is_user_in_team_with_id(user, team_id):
            return GenericViews.forbidden_response(request)

        meetings = MeetingService.get_meetings_of_team_with_id(team_id)
        return JsonResponse(
            {
                "meetings": [
                    serialize_meeting(meeting) for meeting in meetings
                ]
            },
            status=200
        )

    def create_meeting_for_team(self, request):
        """
        Creates a meeting for the given team.
        """
        user = IdentityService.get_session_user(request)
        if user is None:
            return GenericViews.authentication_required_response(request)

        team_id = re.match(r"/api/teams/([0-9]*)/meetings", request.path)[1]

        if not TeamService.is_user_in_team_with_id(user, team_id):
            return GenericViews.forbidden_response(request)

        body = json.loads(request.body.decode("utf-8"))
        name = body["name"]
        venue = body["venue"] if "venue" in body else ""

        meeting = MeetingService.create_meeting_for_team_with_id(
            team_id, name, venue)

        return JsonResponse({"meeting": serialize_meeting(meeting)}, status=201)

    def get_items_of_meeting(self, request):
        """
        Obtains the items of a meeting
        """
        user = IdentityService.get_session_user(request)
        if user is None:
            return GenericViews.authentication_required_response(request)

        meeting_id = int(
            re.match(r"/api/meetings/([0-9]*)/items", request.path)[1])
        meeting = MeetingService.get_meeting_with_id(meeting_id)

        if not TeamService.is_user_in_team_with_id(user, meeting.team.id):
            return GenericViews.forbidden_response(request)

        items = ItemService.get_items_of_meeting_with_id(meeting_id)

        return JsonResponse({
            "items": [serialize_item(item) for item in items]}, status=200)

    def post_item_to_meeting(self, request):
        """
        Creates an item within a meeting.
        """
        user = IdentityService.get_session_user(request)
        if user is None:
            return GenericViews.authentication_required_response(request)

        meeting_id = int(
            re.match(r"/api/meetings/([0-9]*)/items", request.path)[1])
        meeting = MeetingService.get_meeting_with_id(meeting_id)

        if not TeamService.is_user_in_team_with_id(user, meeting.team.id):
            return GenericViews.forbidden_response(request)

        body = json.loads(request.body.decode("utf-8"))
        name = body["name"]
        description = body["description"]

        try:
            item = ItemService.create_item_for_meeting(
                meeting, name, description)
        except InvalidItemException as error:
            return GenericViews.invalid_request_response(request, error)

        return JsonResponse({"item": serialize_item(item)}, status=201)

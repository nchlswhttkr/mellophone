from django.test import TestCase

# from django.db.utils import IntegrityError
from backend.services.team import TeamService
from backend.services.user import UserService
from backend.models import Team
from backend.exceptions import BadRequestException


class TeamServiceTestCase(TestCase):
    def setUp(self):
        self.user = UserService.create("john@email.com", "hunter2", "John", "Doe")

    def test_create_team_for_new_user(self):
        """
        A new user should be able to create a team and be registered as a
        member.
        """
        name = "Glen Eira Band"
        website = "http://gleneiraband.com.au/"

        # A new team should be created
        team = TeamService.create_team_with_user_as_owner(self.user, name, website)
        self.assertEqual(team.name, name)
        self.assertEqual(team.website, website)

        # The user must be a member of this team
        teams_of_user = TeamService.get_teams_of_user_with_id(self.user.id)
        self.assertEqual(len(teams_of_user), 1)
        self.assertEqual(teams_of_user[0].id, team.id)

    def test_create_team_throws_if_no_name(self):
        """
        Newly-created teams must have a name
        """
        with self.assertRaises(BadRequestException, msg="Teams must have a name"):
            TeamService.create_team(name="", website="-")

    def test_get_team(self):
        """
        Create and retrieve a team.
        """

        name = "Glen Eira Band"
        website = "http://gleneiraband.com.au/"
        team = TeamService.create_team_with_user_as_owner(self.user, name, website)

        retrieved_team = TeamService.get(team.id)

        self.assertEqual(team.id, retrieved_team.id)
        self.assertEqual(team.name, retrieved_team.name)
        self.assertEqual(team.website, retrieved_team.website)

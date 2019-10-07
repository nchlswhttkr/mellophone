from django.test import TestCase

# from django.db.utils import IntegrityError
from backend.services.team import TeamService
from backend.services.user import UserService


class TeamServiceTestCase(TestCase):
    team_service = TeamService()
    user_service = UserService()

    def test_create_team_for_new_user(self):
        """
        A new user should be able to create a team and be registered as a
        member.
        """
        user = self.user_service.create_user("john@email.com", "hunter2", "John", "Doe")

        self.assertEqual(
            len(self.team_service.get_teams_of_user(user)),
            0,
            "A new user should not be a member of any teams",
        )

        name = "Glen Eira Band"
        website = "http://gleneiraband.com.au/"
        team = self.team_service.create_team_with_user_as_owner(user, name, website)

        self.assertEqual(team.name, name, "The team should have a matching name")
        self.assertEqual(
            team.website, website, "The team should have a matching website"
        )
        self.assertTrue(
            self.team_service.is_user_in_team_with_id(user, team.id),
            "The user should be a member of the team they have just created",
        )

        teams_of_user = self.team_service.get_teams_of_user(user)

        self.assertEqual(
            len(teams_of_user), 1, "The user should only be a member of their new team"
        )
        self.assertEqual(
            teams_of_user[0].id,
            team.id,
            "The team the user is a member of should be the one they created",
        )

    def test_user_not_in_team(self):
        """
        Users do not have to be members of a team.
        """
        user_in_team = self.user_service.create_user(
            "john@email.com", "hunter2", "John", "Doe"
        )
        user_not_in_team = self.user_service.create_user(
            "jane@email.com", "hunter2", "Jane", "Doe"
        )

        name = "Glen Eira Band"
        website = "http://gleneiraband.com.au/"
        team = self.team_service.create_team_with_user_as_owner(
            user_in_team, name, website
        )

        self.assertTrue(
            self.team_service.is_user_in_team_with_id(user_in_team, team.id),
            "The user who created a team should be a member",
        )
        self.assertFalse(
            self.team_service.is_user_in_team_with_id(user_not_in_team, team.id),
            "Another user who is not in the team should not be a member",
        )

    def test_get_team(self):
        """
        Create and retrieve a team.
        """
        user = self.user_service.create_user("john@email.com", "hunter2", "John", "Doe")

        name = "Glen Eira Band"
        website = "http://gleneiraband.com.au/"
        team = self.team_service.create_team_with_user_as_owner(user, name, website)

        retrieved_team = self.team_service.get_team_with_id(team.id)

        self.assertEqual(
            team.id, retrieved_team.id, "The retrieved team should have the expected ID"
        )
        self.assertEqual(
            team.name,
            retrieved_team.name,
            "The retrieved team should have the expected name",
        )
        self.assertEqual(
            team.website,
            retrieved_team.website,
            "The retrieved team should have the expected website",
        )

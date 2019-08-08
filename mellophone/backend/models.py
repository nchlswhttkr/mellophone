"""
This is where Django reads model information off to write migrations, and where
the backend application can depend on for information about objects within
Mellophone.
"""


from django.db import models
from django.contrib.auth.models import User


class Team(models.Model):
    """
    Teams are the main "groups" of Mellophone, collecting users who want to use
    the application for permissions purposes.

    Memberships and Meetings are owned by a team, rather than individual users,
    because no team should be dependent on single members, lest they be hit by
    a bus...
    """
    name = models.CharField(max_length=100)
    website = models.CharField(max_length=100)


class Membership(models.Model):
    """
    Individual users have membership with a team through these instances. Roles
    are not yet handled, but they will likely also sit within this model.
    """
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    team = models.ForeignKey(Team, on_delete=models.CASCADE)


class Meeting(models.Model):
    """
    Meetings are held by the committee of a team or the team itself to make
    decisions for the group. The model itself is bare for now while it is not
    used within the application.
    """
    name = models.CharField(max_length=100)
    team = models.ForeignKey(Team, on_delete=models.CASCADE)
    date_held = models.DateField(auto_now_add=True)
    venue = models.CharField(max_length=100, null=True)


class Item(models.Model):
    """
    Items are individual points of discussion on a meeting. They can include
    motions/votes and outcomes/actions.
    """
    name = models.CharField(max_length=100)
    description = models.TextField()
    meeting = models.ForeignKey(Meeting, on_delete=models.CASCADE)

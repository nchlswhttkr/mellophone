"""
Services will usually return models that contain excessive information or
information in a format external applications do not expect (for example,
underscored_variable vs camelCaseVariable naming).

The Django instances also do not seem to dict-friendly, so having a method to
unambiguously serialize them is useful.

All these serializers are collected here.
"""


def serialize_user(user):
    return {
        "id": user.id,
        "firstName": user.first_name,
        "lastName": user.last_name,
        "email": user.email
    }


def serialize_team(team):
    return {
        "id": team.id,
        "name": team.name,
        "website": team.website
    }


def serialize_meeting(meeting):
    dto = {
        "id": meeting.id,
        "name": meeting.name,
        "dateHeld": meeting.date_held,
        "team": serialize_team(meeting.team),
    }
    if meeting.venue is not None:
        dto["venue"] = meeting.venue
    return dto


def serialize_item(item):
    return {
        "id": item.id,
        "name": item.name,
        "description": item.description
    }
    # dateCreated
    # dateUpdated

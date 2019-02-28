from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate, login
from django.contrib.auth.models import User
import json


def index(request):
    return HttpResponse("Hello Mellophone!")


@csrf_exempt
def sign_in(request):
    body = json.loads(request.body.decode('utf-8'))
    email = body['email']
    password = body['password']

    user = authenticate(request, username=email, password=password)

    if user is not None:
        login(request, user)
        return JsonResponse({}, status=200)

    return JsonResponse({}, status=403)


@csrf_exempt
def sign_up(request):
    body = json.loads(request.body.decode('utf-8'))
    email = body['email']
    password = body['password']
    first_name = body['first_name']
    last_name = body['last_name']

    User.objects.create_user(
        email, email, password, first_name=first_name, last_name=last_name)
    user = authenticate(request, username=email, password=password)

    if user is not None:
        login(request, user)
        return JsonResponse({}, status=201)

    return JsonResponse({}, status=403)


def who_am_i(request):
    return JsonResponse({"value": request.user.get_username()}, status=200)

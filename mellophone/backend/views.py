from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate, login, logout
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
        return JsonResponse({
            "user": {
                "id": request.user.id,
                "email": request.user.email,
                "firstName": request.user.first_name,
                "lastName": request.user.last_name,
            }
        }, status=200)

    return JsonResponse({}, status=403)


@csrf_exempt
def sign_up(request):
    body = json.loads(request.body.decode('utf-8'))
    email = body['email']
    password = body['password']
    first_name = body['firstName']
    last_name = body['lastName']

    User.objects.create_user(
        email, email, password, first_name=first_name, last_name=last_name)
    user = authenticate(request, username=email, password=password)

    if user is not None:
        login(request, user)
        return JsonResponse({
            "user": {
                "id": request.user.id,
                "email": request.user.email,
                "firstName": request.user.first_name,
                "lastName": request.user.last_name,
            }
        }, status=201)

    return JsonResponse({}, status=403)


@csrf_exempt
def sign_out(request):
    logout(request)
    return JsonResponse({}, status=200)


def who_am_i(request):
    if request.user.is_authenticated:
        return JsonResponse({
            "user": {
                "id": request.user.id,
                "email": request.user.email,
                "firstName": request.user.first_name,
                "lastName": request.user.last_name,
            }
        }, status=200)
    return JsonResponse({}, status=200)

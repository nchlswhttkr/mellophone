from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import ensure_csrf_cookie
from django.views.decorators.http import require_http_methods
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
import json


@ensure_csrf_cookie
def index(request):
    return JsonResponse({}, status=200)


@require_http_methods(["POST"])
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


@require_http_methods(["POST"])
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


@require_http_methods(["POST"])
def sign_out(request):
    logout(request)
    return JsonResponse({}, status=200)


@require_http_methods(["GET"])
def whoami(request):
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

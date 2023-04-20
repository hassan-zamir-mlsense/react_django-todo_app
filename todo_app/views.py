from django.shortcuts import render
from django.http import HttpResponse

from django.http import JsonResponse

from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import JsonResponse
from django.contrib.auth.models import User

from .serializers import TodoModelSerializer
from .models import TodoModel
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import permission_classes
from rest_framework.exceptions import AuthenticationFailed

# Signup API
from rest_framework import generics, permissions
from knox.models import AuthToken
from .serializers import UserSerializer, RegisterSerializer

from django.contrib.auth import get_user_model
from rest_framework_simplejwt.tokens import AccessToken, RefreshToken

from django.contrib.auth.decorators import login_required
from django.shortcuts import redirect

# Create your views here.

def view_name(request):
    return HttpResponse('Successfully configured Google Authentication')


def home(request):
    return HttpResponse('Home Page')


def about(request):
    return render(request, 'todo_app/about.html')


def dashboard(request):
    return render(request, 'todo_app/dashboard.html')


@api_view(['Get', 'Post'])
def api_overview(request):
    # return JsonResponse('API Base Point',safe=False)

    api_urls = {
        'List': '/task-list/',
        'Details View': '/task-detail/<str:pk>/',
        'Create': '/task-create/',
        'Update': '/task-update/<str:pk>/',
        'Delete': '/task-delete/<str:pk>/'
    }
    return Response(api_urls)


@api_view(['Get'])
@permission_classes((IsAuthenticated,))
def task_list(request):
    tasks = TodoModel.objects.all()
    print(tasks[0])
    serializer = TodoModelSerializer(tasks, many=True)
    return Response(serializer.data)


@api_view(['Get'])
@permission_classes((IsAuthenticated,))
def task_detail(request, primary_key):
    tasks = TodoModel.objects.get(id=primary_key)
    serializer = TodoModelSerializer(tasks, many=False)
    return Response(serializer.data)


@api_view(['Post'])
@permission_classes((IsAuthenticated,))
def task_create(request):
    serializer = TodoModelSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()

    return Response(serializer.data)


@api_view(['Post'])
@permission_classes((IsAuthenticated,))
def task_update(request, primary_key):
    task = TodoModel.objects.get(id=primary_key)
    serializer = TodoModelSerializer(instance=task, data=request.data)

    if serializer.is_valid():
        serializer.save()

    return Response(serializer.data)


# @ api_view(['DELETE'])


@api_view(['Get'])
@permission_classes((IsAuthenticated,))
def task_delete(request, primary_key):
    task = TodoModel.objects.get(id=primary_key)
    print(task)
    task.delete()

    return Response('Item Deleted !!!')

def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)
    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }

@login_required
def social_login_redirect(request):
    try: # this check is supplementary after disabling signup
        user = User.objects.get(username=request.user.username)
        tokens = get_tokens_for_user(user)
        res = redirect(f'/', permanent=True)
        res.set_cookie('token', tokens['access'], max_age=60*60*4)
        return res
    except Exception as e:
        print(e)
        return HttpResponse("Not allowed")


# Register API
class RegisterAPI(generics.GenericAPIView):
    serializer_class = RegisterSerializer

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid()
        user = serializer.save()
        return Response({
            "user": ""})


User = get_user_model()


def generate_access_token(user):
    # Generate the token
    access_token = AccessToken()
    refresh_token = RefreshToken()

    # Return the token as a string
    access_token_in_string = str(access_token)
    refresh_token_in_string = str(refresh_token)
    return JsonResponse({'access': access_token_in_string})

#, 'refresh': refresh_token_in_string


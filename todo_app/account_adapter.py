from allauth.socialaccount.adapter import DefaultSocialAccountAdapter
from allauth.account.adapter import DefaultAccountAdapter
from .models import AllowedEmail


class NoSignUpAccountAdapter(DefaultAccountAdapter):
    def is_open_for_signup(self, request):
        return False


class MySocialAccountAdapter(DefaultSocialAccountAdapter):
    def is_open_for_signup(self, request, sociallogin):
        user = sociallogin.user
        return AllowedEmail.objects.filter(email=user.email).exists()

from django.db import models
from django.contrib.auth.models import User
from django.contrib.auth.models import AbstractUser
from django.db import models
import uuid

# Create your models here.

class TodoModel(models.Model):
    # user=models.ForeignKey(User,on_delete=models.CASCADE)
    # user_name = models.CharField(max_length=50, null=True)
    # title = models.CharField(max_length=100, default="New-Todo")
    description = models.TextField(blank=True)
    date_created = models.DateTimeField(auto_now_add=True, null=True)
    completed = models.BooleanField(default=False)

    def __str__(self):
        # return self.title
        return self.description

# class AllowedEmail(models.Model):
#     email = models.EmailField(unique=True)

    # def __str__(self):
    #     return str(self.email)



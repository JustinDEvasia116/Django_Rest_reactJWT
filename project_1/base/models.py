from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Accounts(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    phone = models.BigIntegerField()

    def __str__(self):
        return self.user.username



class Note(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE,null=True)
    body = models.TextField()
    
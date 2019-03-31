from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.auth import get_user_model

# Create your models here.
class UserOfApp(AbstractUser):
    # uaddr= models.CharField(max_length=100)
    # zip= models.CharField(max_length=6)
    # state= models.CharField(max_length=100)
    # city= models.CharField(max_length=100)
    # phone= models.CharField(max_length=10)
    phone= models.CharField(max_length=10)
    def __str__(self):
        return str(self.id)

class CreditApplication(models.Model):
    crid = models.AutoField(primary_key= True)
    uid = models.ForeignKey(UserOfApp, on_delete=models.CASCADE, db_column='uid')


class Type(models.Model):
    tid = models.AutoField(primary_key= True)
    tname = models.CharField(max_length=100)
    def __str__(self):
        return self.tname

class Bank(models.Model):
    bid = models.AutoField(primary_key= True)
    bank_name = models.CharField(max_length=100)
    def __str__(self):
        return str(self.bid)

class BankAccount(models.Model):
    aid = models.AutoField(primary_key= True)
    uid = models.ForeignKey(UserOfApp, on_delete=models.CASCADE, db_column='uid')
    bid= models.ForeignKey(Bank, on_delete=models.CASCADE, db_column='bid')
    balance = models.FloatField(default=0)
    def __str__(self):
        # return str(self.uid.username)+"___"+str(self.bid.bank_name)
        return str(self.aid)

class Transaction(models.Model):
    trid = models.AutoField(primary_key= True)
    aid = models.ForeignKey(BankAccount, on_delete=models.CASCADE, db_column='aid')
    deposit = models.BooleanField()
    created_at = models.DateTimeField(auto_now_add=True)
    amount = models.FloatField(default=0)
    type = models.ForeignKey(Type, on_delete=models.CASCADE, db_column='tid')

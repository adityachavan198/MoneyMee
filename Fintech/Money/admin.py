from django.contrib import admin
from .models import *
# Register your models here.

class UserAdmin(admin.ModelAdmin):
    list_display=['id','first_name','last_name','email']


class BankAdmin(admin.ModelAdmin):#used to display the title as well as other attributes of the book
    #fields=['cid','cstate','sid']
    list_display=['bid','bank_name']
    search_fields=['bid','bank_name']

class TransactionAdmin(admin.ModelAdmin):
    list_display=['trid','aid', 'deposit', 'created_at', 'amount', 'type']
    search_fields=['trid','aid', 'type']

class TypeAdmin(admin.ModelAdmin):#used to display the title as well as other attributes of the book
    #fields=['cid','cstate','sid']
    list_display=['tid','tname']
    search_fields=['tid','tname']

class BankAccountAdmin(admin.ModelAdmin):
    list_display=['aid', 'uid', 'bid', 'balance']
    list_filter=['uid','bid']



admin.site.register(UserOfApp,UserAdmin)
admin.site.register(Bank,BankAdmin)
admin.site.register(Transaction,TransactionAdmin)
admin.site.register(BankAccount,BankAccountAdmin)
admin.site.register(Type,TypeAdmin)

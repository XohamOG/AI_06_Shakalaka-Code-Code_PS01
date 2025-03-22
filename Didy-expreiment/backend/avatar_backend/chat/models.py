from django.db import models

# Create your models here.
from django.db import models

class FAQ(models.Model):
    question = models.TextField()
    answer = models.TextField()

class Document(models.Model):
    title = models.CharField(max_length=255)
    file = models.FileField(upload_to="documents/")

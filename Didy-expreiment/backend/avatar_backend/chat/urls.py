from django.urls import path
from .views import ask_question, generate_avatar_response, upload_document, list_faqs

urlpatterns = [
    path("ask-question/", ask_question, name="ask_question"),
    path("generate-avatar/", generate_avatar_response, name="generate_avatar"),
    path("upload-document/", upload_document, name="upload_document"),
    path("list-faqs/", list_faqs, name="list_faqs"),
]

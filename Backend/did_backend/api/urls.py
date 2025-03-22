from django.urls import path
from .views import get_agent_details

urlpatterns = [
    path('agent/', get_agent_details, name='get_agent_details'),
]

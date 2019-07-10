from django.urls import path, include
from .views import TendersListView


urlpatterns = [
    path('', TendersListView.as_view()),
    ]
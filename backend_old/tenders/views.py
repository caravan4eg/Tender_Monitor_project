from django.shortcuts import render
from django.views.generic import ListView
from .models import Tenders

# Create your views here.

class TendersListView(ListView):
    model = Tenders
    template_name = 'tenders_list.html'
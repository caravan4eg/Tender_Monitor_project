## items.py
import scrapy
from scrapy_djangoitem import DjangoItem
from tenders import models


class TendersItem(DjangoItem):
    """
    Create item - container for scraped data.
    Fields for this item are automatically created 
    from the django model
    """
    django_model = Tenders
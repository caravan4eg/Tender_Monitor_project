# -*- coding: utf-8 -*-
## items.py
from scrapy_djangoitem import DjangoItem
from tenders import models
import scrapy


class TendersItem(DjangoItem):
    """
    Create item - container for scraped data.
    Fields for this item are automatically created 
    from the django model
    """
    django_model = models.Tenders


class ProxyItem(scrapy.Item):
    """ Scraped data is stored here after yield in spider """
    ip = scrapy.Field()
    port = scrapy.Field()
# -*- coding: utf-8 -*-

# Define here the models for your scraped items
#
# See documentation in:
# https://doc.scrapy.org/en/latest/topics/items.html

# import scrapy


# class ScraperItem(scrapy.Item):
#     # define the fields for your item here like:
#     # name = scrapy.Field()
#     pass

## items.py
from scrapy_djangoitem import DjangoItem
from tenders.models import Tenders

class TendersItem(DjangoItem):
    django_model = Tenders
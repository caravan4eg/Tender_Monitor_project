# -*- coding: utf-8 -*-
import scrapy


class IcetradeSpider(scrapy.Spider):
    name = 'icetrade'
    allowed_domains = ['icetrade.by']
    start_urls = ['http://icetrade.by/']

    def parse(self, response):
        pass

'''
run as python script: python icetrade_BS_Scrapy_xxx.py
1. Reresh proxy list by start with Beautifulsoup and lxml
2. Using scrapy_proxy as Middleware for rotating proxy
https://github.com/aivarsk/scrapy-proxies
3. Using Scrapy for web scraping and save results to csv file
4. Using Scrapy-UserAgents for user Agent rotating
https://pypi.org/project/Scrapy-UserAgents/
5. v2.3 - Add timestamp to csv data
6. v2.4 - Add saving results to Posgresql 
7. v2.5 - Using inner Scrapy tools - items to save to csv file-- + automatic dating++
8. v2.6 - insert to DB only new tenders with unique number
        - get data from DB (get_report.py) with plus words (exclude results with minus words and after deadline)
++ v2.7 - process Item --> Pipeline

+++ save scraped data with Item (DjangoItem) & Pipline to PostgreSQL database and CSV
+++ check dublicates through Pipeline
TODO: get_proxy_list run in separate spider or def() and save to list.txt in pipline

TODO: build in Django
TODO: run multiple spiders
TODO: run from Scrapinghub Cloud
TODO: scheduled launch


'''
# to use standart settings.py
import scrapy
from scrapy.utils.project import get_project_settings
import requests
import params as params
from datetime import date

# scrapy api
from scrapy import Spider
import scrapy
from scrapy import signals
from scrapy.settings import Settings

# I CrawlerProcess
from scrapy.crawler import CrawlerProcess
# ----------------------------------
# II CrawlerRunner
from scrapy.crawler import Crawler
from twisted.internet import reactor
from scrapy.crawler import CrawlerRunner
from twisted.internet.defer import inlineCallbacks

# ----------------------------

from scraper.items import ProxyItem, TendersItem
from datetime import datetime

import logging

# RESULT_PAGE_PRIORITY = 0
# PRODUCT_PAGE_PRIORITY = 100


class IceSpiderSpider(Spider):
    """ Extract data from icetrade.by"""
    
    name = 'ice_spider'
    today_is = date.today().strftime("%d.%m.%Y")
    custom_settings = {
        'COOKIES_ENABLED': False,
        'DOWNLOAD_DELAY': 10,  # per download slot value -> per proxy value
        'CONCURRENT_REQUESTS': 2,
        'CONCURRENT_REQUESTS_PER_DOMAIN': 2,
        'FEED_FORMAT': 'csv',
        'FEED_URI': f'output/{today_is}_icetrade_tenders.csv',
                }

    proxies = {}


    def get_proxy_meta(self):
        """Get proxy list and meta parameter for download_slot"""
        print('~~~~~~~~~~~~ Processing GET_PROXY_META is going to be started ~~~~~~~~~~')
        meta =  {}
        proxy = min(self.proxies, key=self.proxies.get)
        self.proxies[proxy] += 1
        meta['download_slot'] = proxy
        print('\n>>>>>>>>>>>>>>>>>>>>>>>> Meta, Proxy: ', meta)
        # meta["cookie_jar"] = proxy
        return meta


    @classmethod
    def from_crawler(cls, crawler, *args, **kwargs):
        spider = super(IceSpiderSpider, cls).from_crawler(crawler, *args, **kwargs)
        # stop reactor when spider closes
        crawler.signals.connect(spider.spider_closed, signal=signals.spider_closed)

        return spider

    def spider_closed(self, spider):
        self.crawler.stats._stats["used_proxies_count"] = len(list(self.proxies))
        spider.logger.info('Spider closed >>>>>>>>>>>>>>>>>>>>>> : %s', spider.name)

    def start_requests(self):
        # yield scrapy.Request(url="http://free-proxy-list.net/",
        yield scrapy.Request(url="https://www.us-proxy.org/",
                             callback=self.parse_proxy)
        self.crawler.stats._stats["used_proxies"] = self.proxies


    def parse_proxy(self, response):
        print('~~~~~~~~~~~~ Getting proxy list ~~~~~~~~~~')
        for row in response.xpath('//table/tbody/tr'):
            # item = ProxyItem()
            row_data = row.xpath('.//td/text()').getall()
            # item['ip'] = row.xpath('.//td/text()')[0].get()
            # item['port'] = row.xpath('.//td/text()')[1].get()
            host_port = row_data[0]+':'+row_data[1]
            self.proxies[host_port] = 0
            self.logger.info('Proxy URL: <%s>' % host_port)

            if 'elite proxy' in row_data: #
                host_port = row_data[0]+':'+row_data[1]
                self.proxies[host_port] = 0
                self.logger.info('Proxy URL: <%s>' % host_port)
                

        if len(list(self.proxies)) > 0:
                      
            # send GET request to icetrade.by with new proxy addr
            # and callback to Parse function
            yield scrapy.Request(url=params.url_pattern.format(str(1)),
                                 meta=self.get_proxy_meta(),
                                 callback=self.parse,
                                 # priority=PRODUCT_PAGE_PRIORITY,
                                 # errback=self.err_back,
                                 # headers=self.get_ua_header(),
                                )
            print('~~~~~~~~~~~~ Proxy list finished  ~~~~~~~~~~')

    def parse(self, response):
        """ Get page url """

        last_page = response.xpath('//div[@id="content"]/div[@class="paging"]/a[9]/text()').get().strip()

        # for i in range(int(last_page)+1):
        for i in range(1):  # scrape some pages for test, not all
            print('Processing page: ' + str(i))

            # request next page and callback to Parse page function
            yield scrapy.Request(
                                params.url_pattern.format(str(i)), 
                                meta=self.get_proxy_meta(),
                                callback=self.parse_page,
                                # priority=RESULT_PAGE_PRIORITY
                                )

    def parse_page(self, response):
        """ Extract tender information """

        data = response.xpath('//*/tr[contains(@class, "rw")]')
        
        for line in data:
            print('~~~~~~~~~~~~ Start exrtacting data from page ~~~~~~~~~~')

            item = TendersItem()
            item['number'] = line.xpath('.//td[4]/text()').get().strip()
            item['customer'] = line.xpath('.//td[2]/text()').get().strip()
            item['description'] = line.xpath('.//td[1]/a/text()').get().strip()
            item['price'] = line.xpath('.//td[5]/span/text()').get().strip()
            item['country'] = line.xpath('.//td[3]/text()').get().strip()
            item['url_addr'] = line.xpath('.//td[1]/a/@href').get()
            # change date format dd-mm-yyyy --> yyyy-mm-dd
            ddmmyyyy = line.xpath('.//td[6]/text()').get().strip()
            yyyymmdd = ddmmyyyy[6:] + "-" + ddmmyyyy[3:5] + "-" + ddmmyyyy[:2]
            item['deadline'] = yyyymmdd
         
            yield item
            print('~~~~~~~~~~~~ Extracting ended. ~~~~~~~~~~')
            print(TendersItem())

    # error processing
    def err_back(self, failure):
        # Not finished/tested yet
        req = failure.request
        if "download_slot" in req.meta.keys():
            failed_proxy = req.meta["download_slot"]
            if failed_proxy in self.proxies.keys():
                del self.proxies[failed_proxy] #delete not valid proxy
                req.meta = self.get_proxy_meta() # get new proxy
                yield req


process = CrawlerProcess()
process.crawl(IceSpiderSpider)
print('~~~~~~~~~~~~ Crawl Process is going to be started ~~~~~~~~~~')
# process.start()
process.start(stop_after_crawl=True)
print('~~~~~~~~~~~~ Processing ended ~~~~~~~~~~')
# # process.stop()


# II
# settings = get_project_settings()
# runner = CrawlerRunner(settings)
# # runner = CrawlerRunner()

# d = runner.crawl(IceSpiderSpider)
# d.addBoth(lambda _: reactor.stop())
# reactor.run() # the script will block here until the crawling is finished



# def run():
#     configure_logging()
#     # importing project settings for further usage
#     # mainly because of the middlewares
#     settings = get_project_settings()
#     runner = CrawlerRunner(settings)

#     # running spiders sequentially (non-distributed)
#     @inlineCallbacks
#     def crawl():
#         yield runner.crawl(IceSpiderSpider)
#         # yield runner.crawl(UATesterSpider)
#         reactor.stop()

#     crawl()
#     reactor.run() # block until the last call 

# run()
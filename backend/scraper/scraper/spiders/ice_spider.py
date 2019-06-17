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
9. v2.7 - Item Pipeline

TODO: save results to DB and csv by scrapy inner tools
TODO: run multiple spiders
TODO: run from Scrapinghub Cloud
TODO: scheduled launch
TODO: build in Django

'''
import requests
import params
from datetime import date
from bs4 import BeautifulSoup
import csv
import scrapy
from scrapy.crawler import CrawlerProcess
from scrapy.utils.project import get_project_settings

from scraper.items import TendersItem


class IceSpiderSpider(scrapy.Spider):
    #name of the spider
    name = 'ice_spider'
    
    #list of allowed domains and start urls
    allowed_domains = ['icetrade.by']
    start_urls = [params.start_urls]

    today_is = date.today().strftime("%d.%m.%Y")
    save_to_file = f'csv/{today_is}_Scrapy.csv'
    
    #location of csv file
    custom_settings = {
                        'FEED_URI': 'tmp/icetrade_tenders.csv' 
                    }

    def parse(self, response):
        """ Get page url
        """
        last_page = response.xpath('//div[@id="content"]/div[@class="paging"]/a[9]/text()').get().strip()

        for i in range(int(last_page)+1):
        # for i in range(1):
            print('Processing page: ' + str(i))
            yield scrapy.Request(params.url_pattern.format(str(i)), callback=self.parse_page)

    def parse_page(self, response):
        """ Extract tender information 
        """
        data = response.xpath('//*/tr[contains(@class, "rw")]')
        
        for line in data:
            item = TendersItem()
            item['number'] = line.xpath('.//td[4]/text()').get().strip()
            item['customer'] = line.xpath('.//td[2]/text()').get().strip()
            item['description'] = line.xpath('.//td[1]/a/text()').get().strip()
            item['price'] = line.xpath('.//td[5]/span/text()').get().strip()
            item['deadline'] = line.xpath('.//td[6]/text()').get().strip()
            item['country'] = line.xpath('.//td[3]/text()').get().strip()
            item['url_addr'] = line.xpath('.//td[1]/a/@href').get()
            # item['research_date'] = self.today_is

            print('Processing tender:', item['number'], item['customer'])

            # store items to csv file
            # перенести в pipline
            with open(self.save_to_file, 'a') as f:
                order = [
                        'number', 'customer', 'description',
                        'price', 'deadline', 'country', 'url_addr', 
                        'created_at', 'updated_at'
                        ]
                writer = csv.DictWriter(f, fieldnames=order)
                writer.writerow(item)
            
            yield item # ???


def get_proxy_list():
    """Get proxy list
    """
    
    try:
        # First purge old files
        open('list.txt', 'w').close()
        open(IceSpiderSpider.save_to_file, 'w').close()

        # Then write down row
        with open(IceSpiderSpider.save_to_file, 'a') as f:
            order = [
                    'number', 'customer', 'description',
                    'price', 'deadline', 'country', 'url_addr', 
                    'created_at', 'updated_at'
                ]
            writer = csv.DictWriter(f, fieldnames=order)
            writer.writeheader()
    
    except:
        print('Skeeping purge old file...')
    
    html = requests.get('https://free-proxy-list.net/').text
    soup = BeautifulSoup(html, 'lxml')

    trs = soup.find('table', id='proxylisttable').find_all('tr')[1:21]

    for tr in trs:
        tds = tr.find_all('td')
        ip = tds[0].text.strip()
        port = tds[1].text.strip()

        print(f'Processing proxy list: http://{ip}:{port}')

        # format proxy for list.txt for Scrapy proxy rotating
        # http://78.11.1.234:8080
        with open('list.txt', 'a') as f:
            f.write('http://' + ip + ':' + port + '\n')

# в джанго типа не нужно тк запускается из commands/crawl.py
# def run_spider():
#     process = CrawlerProcess(get_project_settings())
#     process.crawl(IceSpiderSpider)
#     process.start()  # the script will block here until the crawling is finished


def main():
    get_proxy_list()
    
    # в джанго типа не нужно тк запускается из commands/crawl.py
    # run_spider()

    print('********* Processing data to DATABASE...**************')
    # db.connect()
    # db.create_tables([Icetrade])

    with open(IceSpiderSpider.save_to_file) as file:

        # order = ['number', 'customer', 'description', 'price', 'deadline', 'country', 'url_addr', 'research_date']
        reader = csv.DictReader(file)

        tenders = list(reader)
        idx = 1

        with db.atomic():

            for tender in tenders[1:]:  # 1-st row are headers

                # Checking if tender already exists in DB
                exists = TendersItem.select().where(TendersItem.number == tender['number'])

                # if not exists then add to DB
                if not bool(exists):
                    TendersItem.create(
                            number=tender['number'],
                            customer=tender['customer'],
                            description=tender['description'],
                            price=tender['price'],
                            deadline=tender['deadline'],
                            country=tender['country'],
                            url_addr=tender['url_addr'],
                            research_date=tender['research_date'],
                          )
                    print(f'{idx}. New tender: {tender["number"]}')
                else:
                    print(f'{idx}. Old tender, won\'t be added to DB: {tender["number"]}')
                idx += 1

            # Insert to DB by bunches in 100 rows
            # for index in range(0, len(tenders), 100):
            #     Icetrade.insert_many(tenders[index:index + 100]).execute()
            #     print(index)


if __name__ == '__main__':
    main()

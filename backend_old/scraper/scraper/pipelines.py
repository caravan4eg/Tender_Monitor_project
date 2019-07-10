# import logging
import psycopg2
from  .items import TendersItem, ProxyItem
from  .items import ProxyItem
from scrapy.exceptions import DropItem

class TendersPipeline(object):
    """Save extracted data to database"""

    def open_spider(self, spider):
        # Connect to database
        hostname = 'localhost'
        username = 'postgres'
        password = '1'
        database = 'tender_monitor_db'
        self.connection = psycopg2.connect(
                                    host=hostname,
                                    user=username, 
                                    password=password, 
                                    dbname=database)
        if self.connection:
            self.cur = self.connection.cursor()
            spider.log('**** Well, connection to database is OK! %s' % self.cur)
            print('~~~~~~~~~~~~ Connection to database is OK! ~~~~~~~~~~')

    def close_spider(self, spider):
        self.cur.close()
        self.connection.close()

    def process_item(self, item, spider):
        """ Check if tender already exists in database and 
            if no exception save data to DB
        """
        spider.log('*** <TendersPipeline>: data is processed and saved to db')
        
        try:
            item.save()
        
        except:
            raise DropItem('Tender <%s> already exists in db' % item['number'])
        
        # tender_exists = self.cur.execute(
        #     "SELECT number FROM public.tenders WHERE number = item['number'];")
        # print('tender exist:', tender_exists)
        # if bool(tender_exists):
        #     raise DropItem('Tender already exists %s', item['number'])
        
        # else:
        #     # save item to database
        #     item.save()

        return item


class ProxyPipeline(object):
    """ Get new proxies from https://free-proxy-list.net/ 
        and putt them to list.txt
        List.txt will be used by scrapy_proxy that runs as Middleware 
        for rotating proxy (https://github.com/aivarsk/scrapy-proxies)
    """
    
    def open_spider(self, spider):
        # Purge old or create new file with list of proxies
        # try:
        #     self.file = open('output/list.txt', 'w').close()
        #     spider.log('<<<< ProxyPipeline >>>>>: old proxy list deleted successfully. OK')
    
        # except:
        #     spider.log('<<<<< ProxyPipeline >>>>>>: Skeeping purge old file...')
    
        # open new proxy list
        self.file = open('output/list.txt', 'a')

    def process_item(self, item, spider):
        # write down new proxy to list.txt
        self.file.write('http://' + item['ip'] + ':' + item['port'] + '\n')
        spider.log('<<<<< ProxyPipeline >>>>>: processed new proxy url to list.txt...')
        return item

    def close_spider(self, spider):
        self.file.close()
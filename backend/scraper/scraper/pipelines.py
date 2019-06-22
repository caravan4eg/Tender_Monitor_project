# import logging
import psycopg2
from  .items import TendersItem
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

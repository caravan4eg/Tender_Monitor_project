import psycopg2
from  .items import TendersItem

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
            print('****** Connected to database! *******\n', self.cur)

    def close_spider(self, spider):
        self.cur.close()
        self.connection.close()

    def process_item(self, item, spider):
        # здесь обработка
        print('\n============= Here will be ITEM PROCESSING ===============\n')
        
        # здесь сохранение в базу
        item.save()
        return item



    # def process_item(self, item, spider):
    #     cur = self.conn.cursor()

    #     cur.execute('''
    #             insert into raw_data ( title, url, price, bedrooms, maplink,
    #                longitude, latitude, updated_on, content, image_links,
    #                attributes, size, parsed_on )
    #             values (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s);
    #             ''', [
    #             item['title'],
    #             item['url'],
    #             item['price'],
    #             item.get('bedrooms', None),
    #             item['maplink'],
    #             item['longitude'],
    #             item['latitude'],
    #             item['time'],
    #             item['content'],
    #             item['image_links'],
    #             item['attributes'],
    #             item['size'],
    #             datetime.datetime.now()])
    #     self.conn.commit()
    #     return item
import psycopg2
from  .items import TendersItem

class TendersPipeline(object):

    def __init__(self):
        import psycopg2
        self.conn = psycopg2.connect(user="postgres",
                                     password = "1",
                                     dbname="tenders",
                                     host="localhost")

    def open_spider(self, spider):
        hostname = 'localhost'
        username = 'postgres'
        password = '1' # your password
        database = 'tender_monitor_db.tenders' # ???
        self.connection = psycopg2.connect(host=hostname, user=username, password=password, dbname=database)
        self.cur = self.connection.cursor()

    def close_spider(self, spider):
        self.cur.close()
        self.connection.close()

    def process_item(self, item, spider):
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
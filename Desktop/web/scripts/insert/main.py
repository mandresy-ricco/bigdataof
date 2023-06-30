import mysql.connector
import pandas as pd
from const import *


class Insert:
    def __init__(self):
        self.df = None
        self.connexion = mysql.connector.connect(
            host='127.0.0.1',
            user='etu826',
            password='xnkjrtai',
            database='etu826'
        )

        self.cur = self.connexion.cursor()

    def read(self):
        self.df = pd.read_csv('fichier_formatev2.csv')

    def exist(self, table, id_):
        idtab = None

        if table == "category":
            idtab = 'id_category'
        elif table == "security":
            idtab = 'id_security'
        elif table == "collision":
            idtab = 'id_collision'
        elif table == "brightness":
            idtab = 'id_lum'

        self.cur.execute(f"SELECT * FROM {table} WHERE {idtab} = {int(id_)}")
        return self.cur.fetchall()

    def insertCategory(self, table, id_, index):
        name = None
        sql_query = ""

        if index == "descr_cat_veh":
            name = next((k for k, v in type_car.items() if v == id_), None)
            sql_query = "INSERT INTO {} (id_category, name) VALUES (%s, %s)".format(table)
        elif index == "descr_dispo_secu":
            name = next((k for k, v in secu.items() if v == id_), None)
            sql_query = "INSERT INTO {} (id_security, name) VALUES (%s, %s)".format(table)
        elif index == "descr_type_col":
            name = next((k for k, v in collision.items() if v == id_), None)
            sql_query = "INSERT INTO {} (id_collision, name) VALUES (%s, %s)".format(table)
        elif index == "descr_lum":
            name = next((k for k, v in lum.items() if v == id_), None)
            sql_query = "INSERT INTO {} (id_lum, name) VALUES (%s, %s)".format(table)

        self.cur.execute(sql_query, (id_, name))
        self.connexion.commit()

    def insertPlace(self, longitude, latitude, aglo):
        sql_query = "INSERT INTO place (longitude, latitude, aglo) VALUES (%s, %s,%s)"
        self.cur.execute(sql_query, (longitude, latitude, aglo-1))
        self.connexion.commit()
        id_loc = self.cur.lastrowid
        return id_loc

    def insertAccident(self, week, age, id_user, id_loc, id_security, id_lum, id_collision,
                       id_category):
        sql_query = """
        INSERT INTO accident (week, age, id_user, id_loc, id_security, id_lum, id_collision, id_category)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
        """
        self.cur.execute(sql_query, (
            week, age, id_user, id_loc, id_security, id_lum, id_collision, id_category))

        self.connexion.commit()

    def insertUser(self):
        sql_query = "INSERT INTO user (mail, password) VALUES (%s, %s)"
        self.cur.execute(sql_query, ("algo", "algo"))

        return self.cur.lastrowid

    def handle(self):
        self.read()
        id_user = self.insertUser()
        for _, row in self.df.iterrows():
            if not self.exist('category', row['descr_cat_veh']):
                self.insertCategory('category', row['descr_cat_veh'], 'descr_cat_veh')
            if not self.exist('brightness', row['descr_lum']):
                self.insertCategory('brightness', row['descr_lum'], 'descr_lum')
            if not self.exist('security', row['descr_dispo_secu']):
                self.insertCategory('security', row['descr_dispo_secu'], 'descr_dispo_secu')
            if not self.exist('collision', row['descr_type_col']):
                self.insertCategory('collision', row['descr_type_col'], 'descr_type_col')

            id_place = self.insertPlace(row['longitude'], row['latitude'],row['descr_agglo'])
            self.insertAccident(row['date'], row['age'], id_user, id_place,
                                row['descr_dispo_secu'], row['descr_lum'],
                                row['descr_type_col'], row['descr_cat_veh'])

    def close(self):
        self.connexion.close()


insert = Insert()
insert.handle()
insert.close()

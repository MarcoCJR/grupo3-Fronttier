from time import sleep
from selenium import webdriver
from bs4 import BeautifulSoup as bs
# import pyodbc
import mysql.connector
from mysql.connector import errorcode
# import time


class ReclameAqui:

    

    base_url = "https://www.reclameaqui.com.br/"
    

    def __init__(self, empresa="empresa/kanui"):
        
        # driver = webdriver.Chrome()
        options = webdriver.ChromeOptions()
        options.add_experimental_option('excludeSwitches', ['enable-logging'])
        driver = webdriver.Chrome(options=options)
        self.driver = driver
        self.empresa = empresa

    def extrair_informacoes(self, n_paginas):

        try:
            # conn = pyodbc.connect(driver='{SQL Server}', host='grupo-fronttier3.database.windows.net',
            #             database='Fronttier', user='Fronttier3', password='#Gfgrupo3')
            # print("Conectei no banco! (Azure)")

            cnx = mysql.connector.connect(
                host='localhost', user='aluno', password='sptech', database='fronttier2')
            print("Conectei no banco! (Local)")
        
        except mysql.connector.Error as error:
            if error.errno == errorcode.ER_BAD_DB_ERROR:
                print("Não encontrei o banco")
            elif error.errno == errorcode.ER_ACCESS_DENIED_ERROR:
                print("Credenciais erradas")
            else:
                print(error)

            
        url = self.base_url + self.empresa + "/lista-reclamacoes/?pagina="
        
        self.reclamacoes, self.titulos = [], []

        
        self.driver.get(url + str(n_paginas))
        sleep(3)
        html = bs(self.driver.page_source, "html.parser")

            # reclamacoes_html = html.find_all("div", {"class": "sc-1pe7b5t-0 bJdtis"})
            # reclamacoes_na_pagina = [reclamacao.text.split("|") for reclamacao in reclamacoes_html]
            # self.reclamacoes.extend(reclamacoes_na_pagina)

        titulos_html = html.find_all("h4", {"class": "sc-1pe7b5t-1 fTrwHU"})
        tituloReclamacao = [titulo.text.split("|") for titulo in titulos_html]
        self.titulos.extend(tituloReclamacao)
            #self.links.extend([link.get("href") for link in titulos_na_pagina])
            #print(reclamacoes_na_pagina)
            #print(tituloReclamacao)
        

        cursorLocal = cnx.cursor()

        i = 0
        while i < len(tituloReclamacao):
            print("\n")
            print(cursorLocal.rowcount, "Inserindo no banco (Local)")
            sql = "INSERT INTO reclameAqui (tituloReclamacao) VALUES (%s)"
            val = tituloReclamacao
            cursorLocal.execute(sql, val[i])
            cnx.commit()
            i+=1  
       
        # cursorAzure = conn.cursor()
    
        # AZURE
        # sql = "INSERT INTO [reclameAqui] (tituloReclamacao) VALUES (?)"
        # values = [tituloReclamacao]
        # cursorAzure.execute(sql, values)

      
        #LOCAL
        
        # print("\n")
        # print(cursorAzure.rowcount, "Inserindo no banco (Azure).")
        # conn.commit()
        # time.sleep(3.0)
        

    # def extrair_descricoes(self):
    #     urls = self.base_url + self.empresa + "/lista-reclamacoes/?pagina="
    #     self.descricoes = []
    #     for url in urls:
    #         self.driver.get(url)
    #         sleep(3)
    #         html = bs(self.driver.page_source, "html.parser")
            
    #         descricao = html.find("p", {"class": "sc-1pe7b5t-2 gLneer"}).text.strip()
    #         self.descricoes.append(descricao)
    #         print(descricao)
            
            
            
            

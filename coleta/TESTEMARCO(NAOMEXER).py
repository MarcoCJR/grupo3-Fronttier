# from operator import truediv
# import turtle
import textwrap
from datetime import datetime
import psutil
import time
import pyodbc
import mysql.connector
from mysql.connector import errorcode

# from mysql.connector import errorcode
# Obtain connection string information from the portal
# Some other example server values are
# server = 'localhost\sqlexpress' # for a named instance
# server = 'myserver,port' # to specify an alternate port
# driver='{ODBC Driver 17 for SQL Server}'
# server_name='tcp:grupo-fronttier3'
# server='{server_name}.database.windows.net,1433'.format(server_name=server_name)
# database='Fronttier'
# username='Fronttier3'
# password='#Gfgrupo3'

try:
#     conn = pyodbc.connect(driver='{SQL Server}', host='grupo-fronttier3.database.windows.net',
#                           database='Fronttier', user='Fronttier3', password='#Gfgrupo3')
#     cursorAzure = conn.cursor()
#     print("Conectei no banco! (Azure)")
    db_connection = mysql.connector.connect(
        host='localhost', user='root', password='_Arc3usadmin7410', database='fronttier2')
    cursorLocal = db_connection.cursor()
    print("Conectei no banco! (Local)")


    def Login():
        print("Seja bem vindo ao Python da Fronttier")
        print("Por favor, realize seu login")

        codEmpresa = input('Informe o código de sua empresa: ')
        email = input('Informe seu email: ')
        senha = input('Informe sua senha: ')

        try:
                cursorLocal.execute('''
                SELECT * FROM Usuario WHERE fkCodEmpresa = ? and Email = ? and Senha = ?
                ''', codEmpresa, email, senha)
                print("Fazendo login...")
                usuario = cursorLocal.fetchone()

        except pyodbc.Error as err:
                print("Something went wrong: {}".format(err))
                print("Falha ao realizar login por favor tente novamente")

        if usuario is not None:
                def convertTuple(tup):
                        str = ''
                        for item in tup:
                                str = str + item
                        return str
                str_usuario = convertTuple(usuario)
                print('Olá,', str_usuario, '!')

                SelectMaquina(codEmpresa)

        else:
                print('Email ou senha incoretos! Tente novamente.')
                Login()


    def SelectMaquina(codEmpresa):
        print(codEmpresa)

except mysql.connector.Error as error:
    if error.errno == errorcode.ER_BAD_DB_ERROR:
        print("Não encontrei o banco")
    elif error.errno == errorcode.ER_ACCESS_DENIED_ERROR:
        print("Credenciais erradas")
    else:
        print(error)
# from operator import truediv
# import turtle
# import speedtest
from statistics import mean
# from app import *
# from lost import *
from statistics import mean
import textwrap
from datetime import datetime
import psutil
import time
import numpy
import functools
import operator
import pyodbc
import mysql.connector
from mysql.connector import errorcode

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

# c=1
# while True:
#     enviar_email()

#     while c < 4:

#         token_resposta = input("Token: ")
#         resposta = int(token_resposta)

#         if c == 3:
#             print("Tente novamente mais tarde")
#             exit()

#         if token != resposta:
#             print("Token errado!")
#             c += 1
#             print(c)

#         else:
#             print("Token Correto")
#             break
#     break

#st = speedtest.Speedtest(secure=1)

#st.get_best_server()

try:
    conn = pyodbc.connect(driver='{SQL Server}', host='grupo-fronttier3.database.windows.net',
                          database='Fronttier', user='Fronttier3', password='#Gfgrupo3')
    cursorAzure = conn.cursor()
    print("Conectei no banco! (Azure)")
    db_connection = mysql.connector.connect(
        host='localhost', user='aluno', password='sptech', database='fronttier2')
    cursorLocal = db_connection.cursor()
    print("Conectei no banco! (Local)")
except mysql.connector.Error as error:
    if error.errno == errorcode.ER_BAD_DB_ERROR:
        print("Não encontrei o banco")
    elif error.errno == errorcode.ER_ACCESS_DENIED_ERROR:
        print("Credenciais erradas")
    else:
        print(error)

def Login():
    print("Seja bem vindo ao Python da Fronttier")
    print("Por favor, realize seu login")

    print("")
    codEmpresa = input('Informe o código de sua empresa: ')
    email = input('Informe seu email: ')
    senha = input('Informe sua senha: ')
    print("")

    try:
        cursorAzure.execute('''
        SELECT * FROM Usuario WHERE fkCodEmpresa = ? and Email = ? and Senha = ?
        ''', codEmpresa, email, senha)
        
        print("Fazendo login...")

        cursorAzure.fetchall()
        SelectMaquina(codEmpresa)

    except:
        print("Credenciais incorretas! Tente novamente...")
        print("")
        Login()


def SelectMaquina(codEmpresa):
        
        try:
            cursorAzure.execute('''
            SELECT IdServidor FROM MaquinaServidor WHERE fkCodEmpresa = ?
            ''', codEmpresa)

            idServidor = cursorAzure.fetchall()
            print("")
            print("Servidores Disponíveis: \n", idServidor)
            global escolha
            print("")
            escolha = input("Escolha um Id da lista de máquinas acima: ")
            
            PegarComponente()

        except pyodbc.Error as err:
            print("Something went wrong: {}".format(err))    

def InserirBanco():


        freqAtual = None
        percentualCpu = None
        discoUsado = None
        memoriaUsada = None

        if [1] in vet_fkComponente:
            freqAtual = psutil.cpu_freq().current
        if [2] in vet_fkComponente:
            percentualCpu = psutil.cpu_percent()
        if [3] in vet_fkComponente:
            discoUsado = round(psutil.disk_usage('/').used*(2**-30), 2)
        if [4] in vet_fkComponente:
            memoriaUsada = round(psutil.virtual_memory().used*(2**-30), 2)

        dataHora = datetime.now().strftime('%d/%m/%Y %H:%M:%S')

        cursorAzure.execute('''
        INSERT INTO Dados (fkServidor, dataHora, freqAtual, percentualCpu, discoUsado, memoriaUsada) VALUES (?, ?, ?, ?, ?, ?)
        ''',escolha, dataHora, freqAtual, percentualCpu, discoUsado, memoriaUsada)
        print("")
        print("Dados inseridos no banco!")
        
        cursorAzure.commit()

def PegarComponente():

            try:
                cursorAzure.execute('''
                SELECT fkComponente FROM MaquinaComponente WHERE fkMaquina = ?
                ''', escolha)

                print("")
                print("Pegando os componentes da máquina...")

            except pyodbc.Error as err:
                print("Something went wrong: {}".format(err))

            fkComponente= cursorAzure.fetchall()
            global vet_fkComponente
            vet_fkComponente = numpy.asarray(fkComponente)
            
            for x in vet_fkComponente:
                global y
                y = int(x[0])

                try:
                    cursorAzure.execute('''
                    SELECT Nome FROM Componente WHERE idComponente = ?
                    ''', [y])  

                except pyodbc.Error as err:
                    print("Something went wrong: {}".format(err))

                nome = cursorAzure.fetchone()
                def convertTuple(tup):
                    str = functools.reduce(operator.add, (tup))
                    return str

                global strNome
                strNome = convertTuple(nome)
            InserirBanco()
                    
Login()

while True:
    InserirBanco()
    time.sleep(5)
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

global freqAtual
freqAtual = None
global percentualCpu
percentualCpu = None
global discoUsado
discoUsado = None
global memoriaUsada
usoMemoria = None

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

    codEmpresa = input('Informe o código de sua empresa: ')
    email = input('Informe seu email: ')
    senha = input('Informe sua senha: ')

    try:
        cursorAzure.execute('''
        SELECT * FROM Usuario WHERE fkCodEmpresa = ? and Email = ? and Senha = ?
        ''', codEmpresa, email, senha)
        
        print("Fazendo login...")
        global usuario
        usuario = cursorAzure.fetchall()
        SelectMaquina(codEmpresa)

    except pyodbc.Error as err:
        print("Something went wrong: {}".format(err))
        print("Falha ao realizar login por favor tente novamente")


def SelectMaquina(codEmpresa):
        
        try:
            cursorAzure.execute('''
            SELECT IdServidor FROM MaquinaServidor WHERE fkCodEmpresa = ?
            ''', codEmpresa)

            idServidor = cursorAzure.fetchall()
            print("Servidores Disponíveis: \n", idServidor)
            global escolha
            escolha = input("Escolha um Id da lista de máquinas acima:")

            cursorAzure.execute('''
            INSERT INTO Dados (fkServidor, freqAtual, percentualCpu) VALUES (?, ?, 100.1)
            ''',escolha, freqAtual)
            print("Leitura TESTE inserida no banco")
            cursorAzure.commit()
            
            PegarComponente()

        except pyodbc.Error as err:
            print("Something went wrong: {}".format(err))    

def InserirBanco():
        print("Inserindo leitura no banco...")
        exec(strNome + " = " + strComando, globals())
        var_leitura = globals()[strNome]
            
        print(var_leitura)

        teste = strNome.strip('')
        print(teste)

        # try:
        #     cursorAzure.execute('''
        #     INSERT INTO Dados (fkServidor, freqAtual, percentualCpu) VALUES (?, ?, 100.1)
        #     ''',escolha, freqAtual)
        #     print("Leitura inserida no banco")

        # except pyodbc.Error as err:
        #     cursorAzure.rollback()
        #     print("Something went wrong: {}".format(err))

def PegarComponente():
    # PEGAR fkCOMPONENTE

            try:
                cursorAzure.execute('''
                SELECT fkComponente FROM MaquinaComponente WHERE fkMaquina = ?
                ''', escolha)
                # Executing the SQL command
                print("Pegando os componentes da torre...")

            except pyodbc.Error as err:
                print("Something went wrong: {}".format(err))
                print('teste exept')

            fkComponente= cursorAzure.fetchall()
            print(fkComponente)
            vet_fkComponente = numpy.asarray(fkComponente)
            print("")
            print("")

            if [1] in vet_fkComponente:
                print("tem primeiro da cpu")
            if [2] in vet_fkComponente:
                print("tem segundo da cpu")
            if [3] in vet_fkComponente:
                print("tem terceiro do disco")
            if [4] in vet_fkComponente:
                print("tem quarto da ram")    

            print("")
            print("")
            print("Componentes da maquina:", vet_fkComponente)
            
            for x in vet_fkComponente:
                print(x)
                global y
                y = int(x[0])
                print(y)

                # PEGAR CODIGO COMPONENTE
                
                try:
                    cursorAzure.execute('''
                    SELECT Comando FROM Componente WHERE idComponente = ?
                    ''', [y])                    
                    # Executing the SQL command
                    print("Pegando codigo do componente ", y,'...')

                except pyodbc.Error as err:
                    print("Something went wrong: {}".format(err))

                comando = cursorAzure.fetchone()
                print("Comando do componente ",y,":", comando)

                def convertTuple(tup):
                    str = functools.reduce(operator.add, (tup))
                    return str

                global strComando
                strComando = convertTuple(comando)            

                # PREGAR NOME COMPONENTE

                try:
                    cursorAzure.execute('''
                    SELECT Nome FROM Componente WHERE idComponente = ?
                    ''', [y])  
                    # Executing the SQL command
                    print("Pegando nome do componente", y)

                except pyodbc.Error as err:
                    print("Something went wrong: {}".format(err))

                nome = cursorAzure.fetchone()
                global strNome
                strNome = convertTuple(nome)
                if y > 4:
                    print('Esse componente é em outra API!')
                else:
                    print("Nome componente ",y,":", strNome)
                    print(strNome + " = " + strComando)
                InserirBanco()
                    
Login()
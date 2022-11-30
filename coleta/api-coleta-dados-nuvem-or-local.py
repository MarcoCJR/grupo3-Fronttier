# from operator import truediv
# import turtle
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

global freqCpu
freqCpu = ""
global percentCpu
percentCpu = ""
global usoDisco
usoDisco = ""
global usoRam
usoRam = ""


try:
    # conn = pyodbc.connect(driver='{SQL Server}', host='grupo-fronttier3.database.windows.net',
    #                       database='Fronttier', user='Fronttier3', password='#Gfgrupo3')
    # cursorAzure = conn.cursor()
    # print("Conectei no banco! (Azure)")
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
        mensagem =  "SELECT * FROM Usuario WHERE fkCodEmpresa = %s and Email = %s and Senha = %s"
        valores = [codEmpresa, email, senha]
        cursorLocal.execute(mensagem, valores)
        print("Fazendo login...")
        usuario = cursorLocal.fetchone()

    except pyodbc.Error as err:
        print("Something went wrong: {}".format(err))
        print("Falha ao realizar login por favor tente novamente")

    if usuario is not None:
        print("Login realizado com sucesso! Seja bem vindo!")

        SelectMaquina(codEmpresa)

    else:
        print('Email ou senha incoretos! Tente novamente.')
        Login()


def SelectMaquina(codEmpresa):
        
        try:
            mensagem =  "SELECT IdServidor FROM MaquinaServidor WHERE fkCodEmpresa = %s"
            valores = [codEmpresa]
            cursorLocal.execute(mensagem, valores)

            idServidor = cursorLocal.fetchall()
            print("Servidores Disponíveis: \n", idServidor)
            global escolha
            escolha = input("Escolha um Id da lista de máquinas acima:")
            PegarComponente()

        except pyodbc.Error as err:
            print("Something went wrong: {}".format(err))    



def PegarComponente():
    # PEGAR fkCOMPONENTE

            try:
                mensagem =  "SELECT fkComponente FROM MaquinaComponente WHERE fkMaquina = %s"
                valores = [escolha]
                cursorLocal.execute(mensagem, valores)
                # Executing the SQL command
                print("Pegando os componentes da torre...")

            except pyodbc.Error as err:
                print("Something went wrong: {}".format(err))
                print('teste exept')

            fkComponente= cursorLocal.fetchall()
            print(fkComponente)
            vet_fkComponente = numpy.asarray(fkComponente)
            print("Componentes da maquina:", vet_fkComponente)
            
            for x in vet_fkComponente:
                print(x)
                global y
                y = int(x[0])
                print(y)

                # PEGAR CODIGO COMPONENTE
                
                try:
                    mensagem =  "SELECT Comando FROM Componente WHERE idComponente = %s"
                    valores = [y]
                    cursorLocal.execute(mensagem, valores)
                    # Executing the SQL command
                    print("Pegando codigo do componente ", y,'...')

                except pyodbc.Error as err:
                    print("Something went wrong: {}".format(err))

                comando = cursorLocal.fetchone()
                print("Comando do componente ",y,":", comando)

                def convertTuple(tup):
                    str = functools.reduce(operator.add, (tup))
                    return str

                global strComando
                strComando = convertTuple(comando)            

                # PREGAR NOME COMPONENTE

                try:
                    mensagem =  "SELECT Nome FROM Componente WHERE idComponente = %s"
                    valores = [y]
                    cursorLocal.execute(mensagem, valores)
                    # Executing the SQL command
                    print("Pegando nome do componente", y)

                except pyodbc.Error as err:
                    print("Something went wrong: {}".format(err))

                nome = cursorLocal.fetchone()
                global strNome
                strNome = convertTuple(nome)
                if y > 4:
                    print('Esse componente é em outra API!')
                else:
                    print("Nome componente ",y,":", strNome)
                    exec(strNome + " = " + strComando)
                    print("")
                    print("")
                    print("Teste1", freqCpu)
                    print("Teste2", percentCpu)
                    print("Teste3", usoDisco)
                    print("Teste4", usoRam)

                    
Login()
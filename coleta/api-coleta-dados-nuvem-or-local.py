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
        conn = pyodbc.connect(driver='{SQL Server}', host='grupo-fronttier3.database.windows.net',
                        database='Fronttier', user='Fronttier3', password='#Gfgrupo3')
        cursorAzure = conn.cursor()
        print("Conectei no banco! (Azure)")
        db_connection = mysql.connector.connect(
                host='localhost', user='root', password='sptech@02', database='fronttier2')
        cursorLocal = db_connection.cursor()
        print("Conectei no banco! (Local)")
except mysql.connector.Error as error:
        if error.errno == errorcode.ER_BAD_DB_ERROR:
                print("Não encontrei o banco")
        elif error.errno == errorcode.ER_ACCESS_DENIED_ERROR:
                print("Credenciais erradas")
        else:
                print(error)

def Logar():
        print("Seja bem vindo ao Python da Fronttier")
        print("Por favor, realize seu login")
        
        codEmpresa = input('Informe o código de sua empresa:')
        email = input('Informe seu email:')
        senha = input('Informe sua senha:')
        ValidarLogin(codEmpresa, email, senha)


def ValidarLogin(codEmpresa, email, senha):
    try:
        cursorLocal.execute('''
        SELECT * FROM Usuario WHERE fkCodEmpresa = ? and Email = ? and Senha = ?
        ''', codEmpresa, email, senha)
        # Executando comando SQL
        print("Fazendo login...")
        global usuario
        usuario = cursorLocal.fetchall()
        print("Login efetuado com sucesso")
        global fkEmpresa
        fkEmpresa = codEmpresa

    except pyodbc.Error as err:
        print("Something went wrong: {}".format(err))
        print("Falha ao realizar login por favor tente novamente")

while True: 
      
            
        # psutil.cpu_percent()

    discoTotal = round(psutil.disk_usage('/').total*(2**-30),2)
    memoriaTotal = round(psutil.virtual_memory().total*(2**-30),2)           
                
        # CPU
    freqAtual = psutil.cpu_freq().current
    percentualCpu = psutil.cpu_percent()

                # freqMin = psutil.cpu_freq().min
                # freqMax = psutil.cpu_freq().max

        # DISK
    discoUsado = round(psutil.disk_usage('/').used*(2**-30),2)
    percentualDisco = round(discoUsado / discoTotal,3)

                # discoLivre = round(discoTotal - discoUsado,2)

        # MEMORY
    memoriaUsada = round(psutil.virtual_memory().used*(2**-30),2)
    percentualMemoria = round(memoriaUsada / memoriaTotal,3)

                # memoriaLivre = round(memoriaUsada / memoriaTotal,2)

        # SIMULATION
#     percentualCpu2 = percentualCpu + 10 if (percentualCpu <= 90) else 100.0
#     percentualCpu3 = percentualCpu2 + 5 if (percentualCpu2 <= 95) else 100.0

#     percentualDisco2 = percentualDisco - 0.05 if (percentualDisco >= 0.05) else 0.0
#     percentualDisco3 = percentualDisco2 * 3 if ((percentualDisco2 * 3) <= 1) else 1

#     percentualMemoria2 = percentualMemoria + 0.15 if (percentualMemoria <= 0.85) else 1
#     percentualMemoria3 = percentualMemoria2 - 0.05

#     discoUsado2 = round(discoTotal * percentualDisco2,2)
                # discoLivre2 = discoTotal - discoUsado2
#     discoUsado3 = round(discoTotal * percentualDisco3,2)
                # discoLivre3 = discoTotal - discoUsado3

 
#     memoriaUsada2 = round(memoriaTotal * percentualMemoria2,2)
                # memoriaLivre2 = memoriaTotal - memoriaUsada2
#     memoriaUsada3 = round(memoriaTotal * percentualMemoria3,2)
                # memoriaLivre3 = memoriaTotal - memoriaUsada3

    dataHora = datetime.now()
    formatoh = dataHora.strftime("%d/%m/%Y %H:%M:%S")


# AZURE
    fkServidor = 8
    sql = "INSERT INTO [dados] (fkServidor,dataHora, freqAtual, percentualCpu, discoUsado, memoriaUsada) VALUES (?,?,?,?,?,?)"
    values = [fkServidor,dataHora, freqAtual, percentualCpu, discoUsado, memoriaUsada]
    cursorAzure.execute(sql, values)

# LOCAL

    sql = "INSERT INTO Dados (dataHora, freqAtual, percentualCpu, discoUsado, memoriaUsada) VALUES (%s,%s,%s,%s,%s)"
    values = [dataHora, freqAtual, percentualCpu, discoUsado, memoriaUsada]
    cursorLocal.execute(sql, values)


    print("\n")
    print(cursorAzure.rowcount, "Inserindo no banco (Azure).")
    conn.commit()

    print(cursorLocal.rowcount, "Inserindo no banco (Local).")
    db_connection.commit()

    time.sleep(3.0)
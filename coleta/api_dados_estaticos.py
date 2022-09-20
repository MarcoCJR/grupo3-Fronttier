# Lembrete: Dados da empresa (para colocar em fkEmpresa futuramente) precisam da tela "Cadastro de Servidores" enviando dados da empresa para este arquivo

import psutil
import mysql.connector

try:
    con = mysql.connector.connect(
        host='localhost', user='root', password='', database='Fronttier')
    print("Conexão ao banco estabelecida!")
except mysql.connector.Error as error:
    if error.errno == mysql.connector.errorcode.ER_BAD_DB_ERROR:
        print("Erro: Database não existe")
    elif error.errno == mysql.connector.errorcode.ER_ACCESS_DENIED_ERROR:
        print("Erro: Nome ou senha incorretos")
    else:
        print(error)

freqMin = psutil.cpu_freq().min
freqMax = psutil.cpu_freq().max
discoTotal = round(psutil.disk_usage('/').total*(2**-30),2)
memoriaTotal = round(psutil.virtual_memory().total*(2**-30),2)

cursor = con.cursor()
    
for index in range(3):
    sql = "INSERT INTO Servidor(freqMin, freqMax, discoTotal, memoriaTotal) VALUES (%s,%s,%s,%s)"
    values=[freqMin, freqMax, discoTotal, memoriaTotal]
    cursor.execute(sql,values)
    print(cursor.rowcount,"record inserted")

con.commit()
con.close()
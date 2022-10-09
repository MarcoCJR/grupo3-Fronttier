# create table Servidor (
# idServidor int primary key,
# numeroSerial varchar(45),
# freqMin decimal (6,1),
# freqMax decimal (6,1),
# discoTotal decimal (6,2),
# memoriaTotal decimal (5,2),
# fkCodEmpresa char(7),
# 	foreign key (fkCodEmpresa) references Empresa (codEmpresa)
# );

# create table Dados(
# fkServidor int,
# 	foreign key (fkServidor) references Servidor (idServidor),
# dataHora datetime,
# primary key (fkServidor, dataHora),
# percentualCpu decimal(4,1),
# freqAtual decimal(6,1),
# discoUsado decimal(6,2),
# memoriaUsada decimal(5,2)
# );

import psutil
import time
import mysql.connector
import datetime
import platform

psutil.cpu_percent()
discoTotal = round(psutil.disk_usage('/').total*(2**-30),2)
memoriaTotal = round(psutil.virtual_memory().total*(2**-30),2)

while True:
    try:
        con = mysql.connector.connect(
            host='localhost', user='root', password='Information5526', database='Fronttier2')
        print("Conexão ao banco estabelecida!")
    except mysql.connector.Error as error:
        if error.errno == mysql.connector.errorcode.ER_BAD_DB_ERROR:
            print("Erro: Database não existe")
        elif error.errno == mysql.connector.errorcode.ER_ACCESS_DENIED_ERROR:
            print("Erro: Nome ou senha incorretos")
        else:
            print(error)
    dataHora = datetime.datetime.now().strftime('%y/%m/%d %H:%M:%S')

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
    percentualCpu2 = percentualCpu + 10 if (percentualCpu <= 90) else 100.0
    percentualCpu3 = percentualCpu2 + 5 if (percentualCpu2 <= 95) else 100.0

    percentualDisco2 = percentualDisco - 0.05 if (percentualDisco >= 0.05) else 0.0
    percentualDisco3 = percentualDisco2 * 3 if ((percentualDisco2 * 3) <= 1) else 1

    percentualMemoria2 = percentualMemoria + 0.15 if (percentualMemoria <= 0.85) else 1
    percentualMemoria3 = percentualMemoria2 - 0.05

    discoUsado2 = round(discoTotal * percentualDisco2,2)
    # discoLivre2 = discoTotal - discoUsado2
    discoUsado3 = round(discoTotal * percentualDisco3,2)
    # discoLivre3 = discoTotal - discoUsado3

    memoriaUsada2 = round(memoriaTotal * percentualMemoria2,2)
    # memoriaLivre2 = memoriaTotal - memoriaUsada2
    memoriaUsada3 = round(memoriaTotal * percentualMemoria3,2)
    # memoriaLivre3 = memoriaTotal - memoriaUsada3


    maquinas = [
        [freqAtual, percentualCpu, discoUsado, memoriaUsada],
        [freqAtual, percentualCpu2, discoUsado2, memoriaUsada2],
        [freqAtual, percentualCpu3, discoUsado3, memoriaUsada3],
    ]
    
    cursor = con.cursor() # objeto que permite fazer interação por elementos de uma tabela lendo individualmente cada um
    
    for index, maquina in enumerate(maquinas):
        # comando para inserir os dados das variaveis no banco
        
        sql = "INSERT INTO dados(fkServidor, dataHora, freqAtual, percentualCpu, discoUsado, memoriaUsada) VALUES (%s,%s,%s,%s,%s,%s)"
        values=[(index + 1), dataHora, maquina[0], maquina[1], maquina[2], maquina[3]]
        cursor.execute(sql,values)
        
        meu_so = platform.system()
        print("SO que eu uso : ",meu_so)
        print(cursor.rowcount,"record inserted")

    con.commit()
    con.close() # esse método serve para encerrar a captura de dados e envio ao banco

    time.sleep(2.0) # discretização - reduzir tamanho do dado coletado 

# ATENÇÃO: O script abaixo precisa de tabelas já criadas. Essas tabelas podem ser visualizadas através do arquivo Modelagem-Fronttier.mwb

import time
from statistics import mean
from datetime import datetime
import psutil
import numpy
import functools
import operator
import pyodbc
import mysql.connector
from mysql.connector import errorcode

# OBS: Essas bibliotecas ja vem instaladas junto ao python

# Aqui importamos a função random responsavem por gerar um número aleatório
import random

# Importando as bibliotecas responsáveis pelo envio dos emails

# Simple Mail Transfer Protocol (SMTP) - Protocolo Simples de Transferência de Correspondência
# Smtplib é quem faz a conexão entre servidores para envio dos emails
import smtplib

# Biblioteca responsavel pela formação do email
import email.message

# Senha gerada pelo própio gmail.
# OBS: essa senha serve apenas para o envio automatico de emails, não é possivel acessar a conta através dela;
# NÃO é possivel enviar email automatico utilizando a senha própia do email por motivos de segurança;
# Para gerar esta senha, segue em anexo o PDF com o passo a passo
senha = 'xyvxgugatnikgtnk'

#Gerando um número aleatório entre 1000 e 5000
token = (random.randint(1000, 5000))


def enviar_email():
    # Conteudo que sera enviado pelo email
    corpo_email =  f"""
    Token de acesso:<b> {token}</b>
     """

    # Criando a mensagem de email
    msg = email.message.Message()
    # Definindo assunto do email
    msg['Subject'] = "Token de acesso"
    # Definindo quem irá enviar o email
    msg['From'] = 'fronttier.server@gmail.com'
    # Definindo quem irá receber o email
    msg['To'] = input("Email: ")
    # Senha de quem vai enviar o email
    password =  senha
    # Definindo o email como texto/HTML
    msg.add_header('Content-Type', 'text/html')
   
    # Configuração de segurança do GMAIL
    msg.set_payload(corpo_email)
    # Fazendo conexão com o GMAIL
    s = smtplib.SMTP('smtp.gmail.com: 587')
    s.starttls()


    # Fazendo login com as credenciais
    s.login(msg['From'], password)
    # Enviando email
    s.sendmail(msg['From'], [msg['To']], msg.as_string().encode('utf-8'))
    print('Email enviado')


# Aqui, uma validação onde apenas digitando o token corretamente é interrompido o loop
# Caso digite o token errado 3 vezes o codigo é encerrado

c=1
while True:
    enviar_email()

    while c < 4:

        token_resposta = input("Token: ")
        resposta = int(token_resposta)

        if c == 3:
            print("Tente novamente mais tarde")
            exit()

        if token != resposta:
            print("Token errado!")
            c += 1
            print(c)

        else:
            print("Token Correto")
            break
    break


# Nesse try, fazemos a conexão ao nosso banco na Azure, colocando as devidas credenciais no lugar dos "xxx". Se descomentarmos o código abaixo, teremos conexão tanto à Azure como ao banco local.

try:
    conn = pyodbc.connect(driver='{SQL Server}', host='XXX.database.windows.net',
                          database='XXX', user='XXX', password='XXX')
    cursorAzure = conn.cursor()
    print("Conectei no banco! (Azure)")
    # db_connection = mysql.connector.connect(
    #     host='localhost', user='xxx', password='xxx', database='xxx')
    # cursorLocal = db_connection.cursor()
    # print("Conectei no banco! (Local)")
except mysql.connector.Error as error:
    if error.errno == errorcode.ER_BAD_DB_ERROR:
        print("Não encontrei o banco")
    elif error.errno == errorcode.ER_ACCESS_DENIED_ERROR:
        print("Credenciais erradas")
    else:
        print(error)


    # Função utilizada para perguntar as credenciais do usuário logo após a conexão ao banco de dados ter sido realizada.
def Login():
    print("Seja bem vindo ao Python da Fronttier")
    print("Por favor, realize seu login")

    print("")
    codEmpresa = input('Informe o código de sua empresa: ')
    email = input('Informe seu email: ')
    senha = input('Informe sua senha: ')
    print("")


    # Realizando o select para confirmar identidade do usuário
    try:
        cursorAzure.execute('''
        SELECT * FROM Usuario WHERE fkCodEmpresa = ? and Email = ? and Senha = ?
        ''', codEmpresa, email, senha)
        
        print("Fazendo login...")

        dadosLogin = cursorAzure.fetchall()
        if dadosLogin == []:
            print("Credenciais incorretas! Tente novamente...")
            print("")
            Login()
        else:
            SelectMaquina(codEmpresa)

    except:
        print("Credenciais incorretas! Tente novamente...")
        print("")
        Login()


    # Função para capturar e exibir quais máquinas estão cadastradas de acordo com o login informado na função anterior

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


    # Função que seta os valores padrões como None, e então realiza alguns if para checar se os componentes foram escolhidos. Caso eles tenham sido escolhidos, então o resultado do comando é atualizado de None para o valor capturado.

    # Se desejar inserir mais componentes no monitoramento, eles devem seguir a mesma estrutura dos outros abaixo, sendo adicionados o valor padrão = None e a mudança desse valor num if.
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


    # Função que utiliza o ID que o usuário escolheu durante a seleção de máquinas, para capturar quais componentes essa máquina em específico têm cadastrados, e assim poder definir po que será monitorado e inserido no banco através da função anterior.

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
    time.sleep(3)
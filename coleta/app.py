import smtplib
import email.message
from lost import *



def enviar_email():  
    corpo_email =  f"""
    Token de acesso:<b> {token}</b>
     """

    msg = email.message.Message()
    msg['Subject'] = "Token de acesso"
    msg['From'] = 'fronttier.server@gmail.com'
    msg['To'] = input("Email: ")
    password =  senha
    msg.add_header('Content-Type', 'text/html')
    msg.set_payload(corpo_email )

    s = smtplib.SMTP('smtp.gmail.com: 587')
    s.starttls()
    # Login Credentials for sending the mail
    s.login(msg['From'], password)
    s.sendmail(msg['From'], [msg['To']], msg.as_string().encode('utf-8'))
    print('Email enviado')
 
#enviar_email()



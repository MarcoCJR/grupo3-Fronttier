DROP DATABASE Fronttier2;
CREATE DATABASE Fronttier2;
USE Fronttier2;

CREATE TABLE Permissao (
idPermissao INT PRIMARY KEY, 
descricao VARCHAR (40)
);

INSERT INTO Permissao VALUES (1, "Administrador"),
							 (2, "Usuário"),
                             (3, "Desenvolvedor");

CREATE TABLE Plano (
idPlano INT PRIMARY KEY,
descricao VARCHAR(45)
);

INSERT INTO Plano VALUES (1, "Gold"),
						 (2, "Platinum"),
                         (3, "Diamond");

CREATE TABLE Empresa (
codEmpresa INT PRIMARY KEY,
nomeEmpresa VARCHAR(45),
cnpj CHAR(18),
fkPlano INT,
FOREIGN KEY (fkPlano) REFERENCES Plano (idPlano)
);

CREATE TABLE Usuario (
idUsuario INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(45),
sobreNome VARCHAR(45),
telefone CHAR(15),
email VARCHAR(45),
senha VARCHAR (45),
fkCodEmpresa INT,
FOREIGN KEY (fkCodEmpresa) REFERENCES Empresa(codEmpresa),
fkPermissao INT,
FOREIGN KEY (fkPermissao) REFERENCES Permissao (idPermissao)
);

CREATE TABLE MaquinaServidor (
idServidor INT PRIMARY KEY AUTO_INCREMENT,
fkCodEmpresa INT,
FOREIGN KEY (fkCodEmpresa) REFERENCES Empresa (codEmpresa),
numeroSerial INT,
posicaoLinha INT,
posicaoColuna INT
);

CREATE TABLE Dados(
idDados INT PRIMARY KEY AUTO_INCREMENT,
fkServidor INT,
FOREIGN KEY (fkServidor) REFERENCES MaquinaServidor (idServidor),
dataHora DATETIME,
freqAtual DECIMAL(6,1),
percentualCpu DECIMAL(4,1),
discoUsado DECIMAL(6,2),
memoriaUsada DECIMAL(5,2)
);

SELECT * FROM Empresa;
SELECT * FROM Usuario;
SELECT * FROM MaquinaServidor;
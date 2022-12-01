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

INSERT INTO Empresa VALUES( 1234, "Teste", "123456789012345678", 1);

CREATE TABLE Usuario (
idUsuario INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(45),
sobreNome VARCHAR(45),
telefone CHAR(11),
email VARCHAR(45),
senha VARCHAR (45),
fkCodEmpresa INT,
FOREIGN KEY (fkCodEmpresa) REFERENCES Empresa(codEmpresa),
fkPermissao INT,
FOREIGN KEY (fkPermissao) REFERENCES Permissao (idPermissao)
);

INSERT INTO Usuario VALUES (null, "Marco", "Campos", "11940273200", "marco@gmail.com", "123", 1234, 3);

CREATE TABLE MaquinaServidor (
idServidor INT PRIMARY KEY AUTO_INCREMENT,
fkCodEmpresa INT,
FOREIGN KEY (fkCodEmpresa) REFERENCES Empresa (codEmpresa),
numeroSerial INT UNIQUE,
posicaoLinha INT,
posicaoColuna INT
);


-- TABELA NOVA
CREATE TABLE Componente (
idComponente INT PRIMARY KEY,
Nome VARCHAR(20),
Comando VARCHAR(50)
);

INSERT INTO Componente VALUES (1, "freqAtual", "psutil.cpu_freq().current"),
							  (2, "percentualCpu", "psutil.cpu_percent()"),
                              (3, "discoUsado", "round(psutil.disk_usage('/').used*(2**-30),2)"),
                              (4, "memoriaUsada", "round(psutil.virtual_memory().used*(2**-30),2)");

-- TABELA NOVA
CREATE TABLE MaquinaComponente (
fkMaquina INT,
fkComponente INT,
PRIMARY KEY(fkMaquina, fkComponente),
FOREIGN KEY (fkMaquina) REFERENCES MaquinaServidor(idServidor),
FOREIGN KEY (fkComponente) REFERENCES Componente(idComponente)
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

-- Nova tabela
CREATE TABLE Disco(
idDisco INT PRIMARY KEY AUTO_INCREMENT,
fkServidor INT,
FOREIGN KEY (fkServidor) REFERENCES MaquinaServidor (idServidor),
dataHora DATETIME,
discoTotal DECIMAL(6,2),
discoUso DECIMAL (6,2),
discoLivre DECIMAL (6,2),
porcentagem DECIMAL(4,1),
discoLido DECIMAL(6,2),
discoEscrito DECIMAL(6,2)
);
                              
SELECT * FROM Empresa;
SELECT * FROM Usuario;
SELECT * FROM MaquinaServidor;
select * from Componente;
select * from MaquinaComponente ORDER BY fkMaquina;
select * from Dados;
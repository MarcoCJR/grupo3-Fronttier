create database Fronttier;
use Fronttier;
create table Tiers (
idTiers int primary key,
nome varchar(45),
preco varchar(45)
);
	-- Dados que estaram já inseridos no banco de dados(mocado)

create table Empresa (
codEmpresa char(7) primary key,
nome varchar(45),
cnpj char(18),
telefone varchar(45),
fkTiers int,
foreign key (fkTiers) references Tiers (idTiers)
);

-- Dados que seram cadastrados via Api

create table Usuario (
idUsuario int primary key,
fkEmpresa char(7),
foreign key (fkEmpresa) references Empresa(codEmpresa),
nome varchar(45),
sobreNome varchar(45),
email varchar(45),
senha varchar (45)
);

-- Dados que seram cadastrados via Api

create table Servidor (
idServidor int primary key auto_increment,
numeroSerial varchar(45),
freqMin decimal (6,1),
freqMax decimal (6,1),
discoTotal decimal (6,2),
memoriaTotal decimal (5,2),
fkEmpresa char(7),
	foreign key (fkEmpresa) references Empresa (codEmpresa)

	-- Dados que estaram já inseridos no banco de dados(mocado)
);
select * from Servidor;

insert into Servidor values (100,'0010','10000.0','10000.0','2000.00','300.00','1001');

create table Dados(
fkServidor int,
	foreign key (fkServidor) references Servidor (idServidor),
dataHora datetime,
primary key (fkServidor, dataHora),
freqAtual decimal(6,1),
percentualCpu decimal(4,1),
discoUsado decimal(6,2),
memoriaUsada decimal(5,2)
);
-- Dados que seram cadastrados via Api


select * from Dados;

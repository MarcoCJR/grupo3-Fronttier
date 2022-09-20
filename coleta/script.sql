create database Fronttier;
use Fronttier;
create table Tiers (
idTiers int primary key,
nome varchar(45),
preco varchar(45)
);

create table Empresa (
codEmpresa char(7) primary key,
nome varchar(45),
cnpj char(18),
telefone varchar(45),
fkTiers int,
	foreign key (fkTiers) references Tiers (idTiers)
);
create table Usuario (
idUsuario int primary key,
fkEmpresa char(7),
	foreign key (fkEmpresa) references Empresa(codEmpresa),
primeiroNome varchar(45),
ultimoNome varchar(45),
email varchar(45),
senha varchar (45)
);

create table Servidor (
idServidor int primary key auto_increment,
numeroSerial varchar(45),
freqMin decimal (6,1),
freqMax decimal (6,1),
discoTotal decimal (6,2),
memoriaTotal decimal (5,2),
fkEmpresa char(7),
	foreign key (fkEmpresa) references Empresa (codEmpresa)
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

select * from Dados;

create database Fronttier2;
use Fronttier2;

create table Permissao (
idPermissao int primary key, 
descricao varchar (40)
);

create table Plano (
idPlano int primary key,
descricao varchar(45)
);

create table Empresa (
idEmpresa int primary key auto_increment,
codEmpresa char(4) unique,
nomeEmpresa varchar(45),
cnpj char(18),
fkPlano int,
foreign key (fkPlano) references Plano (idPlano)
);

create table Usuario (
idUsuario int primary key auto_increment,
nome varchar(45),
sobreNome varchar(45),
telefone char(16),
email varchar(45),
senha varchar (45),
fkEmpresa int,
foreign key (fkEmpresa) references Empresa(idEmpresa),
fkCodEmpresa char(4),
foreign key (fkCodEmpresa) references Empresa(codEmpresa),
fkPermissao int,
foreign key (fkPermissao) references Permissao (idPermissao)
);


create table MaquinaServidor (
idServidor int primary key auto_increment,
fkEmpresa int,
foreign key (fkEmpresa) references Empresa (idEmpresa),
numeroSerial varchar(45),
posicaoLinha INT,
posicaoColuna INT
);

create table Dados(
idDados int primary key auto_increment,
fkServidor int,
foreign key (fkServidor) references MaquinaServidor (idServidor),
dataHora datetime,
freqAtual decimal(6,1),
percentualCpu decimal(4,1),
discoUsado decimal(6,2),
memoriaUsada decimal(5,2)
);
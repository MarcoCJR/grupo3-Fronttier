create database fronttier2;
use fronttier2;

create table reclameAqui(
idReclamacao int primary key auto_increment,
tituloReclamacao varchar(500)
);

select * from reclameAqui;
truncate table reclameAqui;
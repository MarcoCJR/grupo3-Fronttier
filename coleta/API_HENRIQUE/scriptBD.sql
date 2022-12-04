use Fronttier;

create table Reclamacoes(
idPalavra int primary key identity,
palavra varchar(30)
);

select * from Reclamacoes;
truncate table Reclamacoes;


-- select para trazer as palavras duplicadas e a quantidade de vezes que elas aparecem
SELECT count(palavra), palavra FROM [dbo].[Reclamacoes] GROUP BY palavra HAVING COUNT(palavra) > 1 ORDER BY count(palavra) DESC;


DELETE FROM [dbo].[Reclamacoes] WHERE palavra = 'DE';
DELETE FROM [dbo].[Reclamacoes] WHERE palavra = 'O';
DELETE FROM [dbo].[Reclamacoes] WHERE palavra = 'MEU';
DELETE FROM [dbo].[Reclamacoes] WHERE palavra = 'SEU';
DELETE FROM [dbo].[Reclamacoes] WHERE palavra = 'NÃO';
DELETE FROM [dbo].[Reclamacoes] WHERE palavra = 'COM';
DELETE FROM [dbo].[Reclamacoes] WHERE palavra = 'A';
DELETE FROM [dbo].[Reclamacoes] WHERE palavra = 'E';
DELETE FROM [dbo].[Reclamacoes] WHERE palavra = 'SEU';
DELETE FROM [dbo].[Reclamacoes] WHERE palavra = 'NO';
DELETE FROM [dbo].[Reclamacoes] WHERE palavra = 'DO';
DELETE FROM [dbo].[Reclamacoes] WHERE palavra = 'ESTÁ';
DELETE FROM [dbo].[Reclamacoes] WHERE palavra = 'DA';
DELETE FROM [dbo].[Reclamacoes] WHERE palavra = 'CONSIGO';
DELETE FROM [dbo].[Reclamacoes] WHERE palavra = 'MEUS';
DELETE FROM [dbo].[Reclamacoes] WHERE palavra = 'AO';
DELETE FROM [dbo].[Reclamacoes] WHERE palavra = 'CASAMENTO';
DELETE FROM [dbo].[Reclamacoes] WHERE palavra = 'NA';
DELETE FROM [dbo].[Reclamacoes] WHERE palavra = 'NAO';
DELETE FROM [dbo].[Reclamacoes] WHERE palavra = 'SEM';
DELETE FROM [dbo].[Reclamacoes] WHERE palavra = 'QUE';
DELETE FROM [dbo].[Reclamacoes] WHERE palavra = 'POR';
DELETE FROM [dbo].[Reclamacoes] WHERE palavra = 'EM';
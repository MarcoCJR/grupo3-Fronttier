const { emit } = require("nodemon");
var database = require("../database/config")


function listar() {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucao = `
        SELECT * FROM usuario;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function entrar(nomeEmp, email, senha) {
    var instrucao = ``
    var instrucao2 = ``

    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", nomeEmp, email, senha)

    instrucao = `
        SELECT email, nome, fkPermissao, fkCodEmpresa, nomeEmpresa FROM usuario, empresa WHERE nomeEmpresa = '${nomeEmp}' AND email = '${email}' AND senha = '${senha}' ;`
        ;


    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao, instrucao2);

}

function nomeEmpresa(fkCodEmpresa) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrarP():", fkCodEmpresa);

    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucao = `
    select nomeEmpresa from Empresa where codEmpresa = ${fkCodEmpresa};
    `;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}



function cadastrar(codEmpresa, empresaNome, cnpj, plano) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", codEmpresa, empresaNome, cnpj, plano);

    var instrucao = `
        INSERT INTO Empresa (codEmpresa, nomeEmpresa, cnpj, fkPlano) VALUES (${codEmpresa}, '${empresaNome}', '${cnpj}', ${plano});
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

// Criando a função cadastrar usuario

function cadastrarU(nome, sobreNome, telefone, email, senha, fkCodEmpresa) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, sobreNome, telefone, email, senha, fkCodEmpresa);

    var instrucao = `
        INSERT INTO Usuario (nome, sobreNome, telefone, email, senha, fkCodEmpresa, fkPermissao) VALUES ('${nome}', '${sobreNome}', '${telefone}', '${email}', '${senha}', ${fkCodEmpresa}, 1);
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}



function cadastrarTecnico(nome, sobreNome, telefone, email, senha, fkCodEmpresa) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, sobreNome, telefone, email, senha, fkCodEmpresa);

    var instrucao = `
        INSERT INTO Usuario (nome, sobreNome, telefone, email, senha, fkCodEmpresa, fkPermissao) VALUES ('${nome}', '${sobreNome}', '${telefone}', '${email}', '${senha}', ${fkCodEmpresa}, 3);
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}



function cadastrarUserDash(nome, sobreNome, telefone, email, senha, fkCodEmpresa, fkPermissaoUser) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, sobreNome, telefone, email, senha, fkCodEmpresa, fkPermissaoUser);

    var instrucao = `
        INSERT INTO Usuario (nome, sobreNome, telefone, email, senha, fkCodEmpresa, fkPermissao) VALUES ('${nome}', '${sobreNome}', '${telefone}', '${email}', '${senha}', ${fkCodEmpresa}, ${fkPermissaoUser});
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}




function cadastrarM(fkCodEmpresa, serial, linha, coluna) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", fkCodEmpresa, serial, linha, coluna);

    var instrucao = `
        INSERT INTO MaquinaServidor (fkCodEmpresa, numeroSerial, posicaoLinha, posicaoColuna) VALUES (${fkCodEmpresa}, '${serial}', ${linha}, ${coluna});
    `;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function CadastrarComponente(idServidor, fkComponente) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function CadastrarComponente():", idServidor, fkComponente);

    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucao = `
    INSERT INTO MaquinaComponente VALUES (${idServidor}, ${fkComponente});
    `;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function UltimaMaquina(fkCodEmpresa) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", fkCodEmpresa)
    var instrucao = `
    SELECT * FROM MaquinaServidor WHERE fkCodEmpresa = '${fkCodEmpresa}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function alertas(nomeEmp, maquina, componente, metrica, frase) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function alertas():", nomeEmp, maquina, componente, metrica, frase);

    var instrucao = `
        INSERT INTO Chamado (nomeEmp, maquina, componente, metrica, valor, dataHora) VALUES ('${nomeEmp}', '${maquina}', '${componente}', '${frase}', '${metrica}', GETDATE());
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function obterDadosComponentes(nomeEmpresa) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function obterDadosComponentes():", nomeEmpresa);

    var instrucao = `select componente, count((case when metrica = 'Alerta' then metrica end)) as Alerta, count((case when metrica = 'Emergência' then metrica end)) as Emergência, count((case when metrica = 'Crítico' then metrica end)) as Crítico from Chamado where nomeEmp = '${nomeEmpresa}' group by componente;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function FiltroComponentes(idServidor) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function FiltroComponentes():", idServidor);

    var instrucao = `SELECT fkComponente FROM MaquinaComponente WHERE fkMaquina = ${idServidor};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    entrar,
    cadastrar,
    listar,
    cadastrarU,
    cadastrarM,
    CadastrarComponente,
    UltimaMaquina,
    cadastrarTecnico,
    cadastrarUserDash,
    nomeEmpresa,
    alertas,
    obterDadosComponentes,
    FiltroComponentes
};
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

function entrar(email, senha) {
    var instrucao = ``
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)

    instrucao = `
        SELECT email, nome, fkPermissao FROM usuario WHERE email = '${email}' AND senha = '${senha}';`
        ;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);

}


// Coloque os mesmos parâmetros aqui. Vá para a var instrucao
function cadastrar(codEmpresa, empresaNome, cnpj, plano) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", codEmpresa, empresaNome, cnpj, plano);

    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucao = `
        INSERT INTO Empresa (codEmpresa, nomeEmpresa, cnpj, fkPlano) VALUES (${codEmpresa}, '${empresaNome}', '${cnpj}', ${plano});
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

// Criando a função cadastrar usuario

function cadastrarU(nome, sobreNome, telefone, email, senha, fkCodEmpresa) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, sobreNome, telefone, email, senha, fkCodEmpresa);

    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucao = `
        INSERT INTO Usuario (nome, sobreNome, telefone, email, senha, fkCodEmpresa, fkPermissao) VALUES ('${nome}', '${sobreNome}', '${telefone}', '${email}', '${senha}', ${fkCodEmpresa}, 1);
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}




function cadastrarUserDash(nome, sobreNome, telefone, email, senha, fkCodEmpresa, fkPermissaoUser) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, sobreNome, telefone, email, senha, fkCodEmpresa, fkPermissaoUser);

    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucao = `
        INSERT INTO Usuario (nome, sobreNome, telefone, email, senha, fkCodEmpresa, fkPermissao) VALUES ('${nome}', '${sobreNome}', '${telefone}', '${email}', '${senha}', ${fkCodEmpresa}, ${fkPermissaoUser});
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
} 






function cadastrarM(fkCodEmpresa, serial, linha, coluna) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", fkCodEmpresa, serial, linha, coluna);

    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucao = `
        INSERT INTO MaquinaServidor (fkCodEmpresa, numeroSerial, posicaoLinha, posicaoColuna) VALUES (${fkCodEmpresa}, '${serial}', ${linha}, ${coluna});
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
    cadastrarUserDash
};
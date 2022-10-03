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

function entrar(email, codigo, senha) {
    var instrucao = ``
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, codigo, senha)
    
        instrucao+=`
        SELECT fkPermissao FROM usuario WHERE email = '${email}' AND fkEmpresa = ${codigo} AND senha = '${senha}';`   
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
        INSERT INTO Empresa (codEmpresa, nomeEmpresa, cnpj, fkPlano) VALUES ('${codEmpresa}', '${empresaNome}', '${cnpj}', '${plano}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

// Criando a função cadastrar usuario

function cadastrarU(nome, sobreNome, telefone, email, senha, fkEmpresa, fkPermissao) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, sobreNome, telefone,  email, senha, fkEmpresa, fkPermissao);
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucao = `
        INSERT INTO Usuario (nome, sobreNome, telefone, email, senha, fkEmpresa, fkPermissao) VALUES ('${nome}', '${sobreNome}', '${telefone}', '${email}', '${senha}', ${fkEmpresa}, ${fkPermissao});
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
} 

module.exports = {
    entrar,
    cadastrar,
    listar,
    cadastrarU,
};
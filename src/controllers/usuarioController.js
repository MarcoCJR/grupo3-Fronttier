var usuarioModel = require("../models/usuarioModel");

var sessoes = [];

function testar(req, res) {
    console.log("ENTRAMOS NA usuarioController");
    res.json("ESTAMOS FUNCIONANDO!");
}

function listar(req, res) {
    usuarioModel.listar()
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!")
            }
        }).catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao realizar a consulta! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}


function nomeEmpresa(req, res) {
    var codEmpresa = req.body.fkcodEmpresaServer;
    
    if(codEmpresa == undefined) {
        res.status(400).send("Seu fkEmpresa está undefined!");
    }else {
        
usuarioModel.nomeEmpresa(codEmpresa)
    .then(
        function (resultado) {
            console.log(`\nResultados encontrados: ${resultado.length}`);
            console.log(`Resultados: ${JSON.stringify(resultado)}`); // transforma JSON em String

            if (resultado.length != 0) {
                console.log(resultado);
                res.json(resultado);
            } else if (resultado.length == 0) {
                res.status(403).send("Não tem torre");
            }
        }
    ).catch(
        function (erro) {
            console.log(erro);
            console.log("\nHouve um erro ao realizar o encontrar nome emp! Erro: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        }
    );
}}

function entrar(req, res) {

    var nomeEmp = req.body.nomeEmpServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (nomeEmp == undefined) {
        res.status(400).send("Seu nomeEmp está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está indefinida!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    }  else {

        usuarioModel.entrar(nomeEmp, email, senha)
            .then(
                function (resultado) {
                    console.log(`\nResultados encontrados: ${resultado.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultado)}`); // transforma JSON em String

                    if (resultado.length == 1) {
                        console.log(resultado);
                        res.json(resultado[0]);
                    } else if (resultado.length == 0) {
                        res.status(403).send("Email e/ou senha inválido(s)");
                    } else {
                        res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                    }


                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }



}

function cadastrar(req, res) {

    var codigo = req.body.codigoServer
    var empresaNome = req.body.nomeEmpresaServer;
    var cnpj = req.body.cnpjServer;
    //  var email = req.body.emailServer;
    // var senha = req.body.senhaServer;
    var plano = req.body.fkPlanoServer;


    if (codigo == undefined) {
        res.status(400).send("Seu cod está undefined!");
    } else if (empresaNome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (cnpj == undefined) {
        res.status(400).send("Seu cnpj está undefined!");
    } else if (plano == undefined) {
        res.status(400).send("Seu plano está undefined!");
    } else {


        usuarioModel.cadastrar(codigo, empresaNome, cnpj, plano)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}


function cadastrarU(req, res) {

    var nome = req.body.nomeServer
    var sobreNome = req.body.sobreNomeServer;
    var telefone = req.body.telefoneServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;
    var fkCodEmpresa = req.body.fkCodEmpresaServer;


    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (sobreNome == undefined) {
        res.status(400).send("Seu sobrenome está undefined!");
    } else if (telefone == undefined) {
        res.status(400).send("Seu telefone está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else if (fkCodEmpresa == undefined) {
        res.status(400).send("Seu fkCodEmpresa está undefined!");
    }  else {


        usuarioModel.cadastrarU(nome, sobreNome, telefone, email, senha, fkCodEmpresa)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
} 



function cadastrarUserDash(req, res) {

    var nome = req.body.nomeServer
    var sobreNome = req.body.sobreNomeServer;
    var telefone = req.body.telefoneServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;
    var fkCodEmpresa = req.body.fkCodEmpresaServer;
    var fkPermissao = req.body.fkPermissaoServer;

    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (sobreNome == undefined) {
        res.status(400).send("Seu sobrenome está undefined!");
    } else if (telefone == undefined) {
        res.status(400).send("Seu telefone está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else if (fkCodEmpresa == undefined) {
        res.status(400).send("Seu fkCodEmpresa está undefined!");
    } else if (fkPermissao == undefined) {
        res.status(400).send("Sua permissão está undefined!");
    } else {

        usuarioModel.cadastrarUserDash(nome, sobreNome, telefone, email, senha, fkCodEmpresa, fkPermissao)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}


function cadastrarTecnico(req, res) {
    var nome = req.body.nomeServer
    var sobreNome = req.body.sobreNomeServer;
    var telefone = req.body.telefoneServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;
    var fkCodEmpresa = req.body.fkCodEmpresaServer;


    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (sobreNome == undefined) {
        res.status(400).send("Seu sobrenome está undefined!");
    } else if (telefone == undefined) {
        res.status(400).send("Seu telefone está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else if (fkCodEmpresa == undefined) {
        res.status(400).send("Seu fkCodEmpresa está undefined!");
    } else {

        usuarioModel.cadastrarTecnico(nome, sobreNome, telefone, email, senha, fkCodEmpresa)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}







function cadastrarM(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var fkCodEmpresa = req.body.fkCodEmpresaServer
    var serial = req.body.serialServer;
    var linha = req.body.linhaServer;
    var coluna = req.body.colunaServer;

    // Faça as validações dos valores
    if (fkCodEmpresa == undefined) {
        res.status(400).send("Seu fkCodEmpresa está undefined!");
    } else if (serial == undefined) {
        res.status(400).send("Seu serial está undefined!");
    } else if (linha == undefined) {
        res.status(400).send("Sua linha está undefined!");
    } else if (coluna == undefined) {
        res.status(400).send("Sua coluna está undefined!");
    } else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.cadastrarM(fkCodEmpresa, serial, linha, coluna)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}


module.exports = {
    entrar,
    cadastrar,
    listar,
    testar,
    cadastrarU,
    cadastrarUserDash,
    cadastrarM,
    cadastrarTecnico,
    nomeEmpresa
}
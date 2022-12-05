var medidaModel = require("../models/medidaModel");


// Maquina 1 

function buscarUltimasMedidas(req, res) {

    const limite_linhas = 7;

    var idServidor= req.params.idServidor;

    console.log(`Recuperando as ultimas ${limite_linhas} medidas`);

    medidaModel.buscarUltimasMedidas(idServidor, limite_linhas).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}


function buscarMedidasEmTempoReal(req, res) {

    var idServidor = req.params.idServidor;

    console.log(`Recuperando medidas em tempo real`);

    medidaModel.buscarMedidasEmTempoReal(idServidor).then(function (resultado) {
        if (resultado.length > 0) {
            res.json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    }); 

}

// Fim maquina 1  

// Maquina 2 




// Criando medidas Freq



    function buscarMedidas(req, res) {

    var idAquario = req.params.idAquario;

    console.log(`Recuperando medidas em tempo real`);

    medidaModel.buscarMedidas(idAquario).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function buscarMedidasChamados(req, res) {

    var idChamado = req.params.idChamado;

    console.log(`Recuperando medidas em tempo real`);

    medidaModel.buscarMedidasChamados(idChamado).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function buscarMedidasPalavras(req, res) {

    var palavra = req.params.palavra;

    console.log(`aaaaaaaaaaaaa`);

    medidaModel.buscarMedidasPalavras(palavra).then(function (resultado) {
        console.log("abacaxi" + resultado[0])
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function ultimasMedidasDisco(req, res) {

    const limite_linhas = 7;

    var idServidor= req.params.idServidor;

    console.log(`Recuperando as ultimas ${limite_linhas} medidas`);

    medidaModel.ultimasMedidasDisco(idServidor, limite_linhas).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function buscarMedidasDisco(req, res) {

    var idServidor = req.params.idServidor;

    console.log(`Recuperando medidas em tempo real`);

    medidaModel.buscarMedidasDisco(idServidor).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}


//Rede dash

function buscarUltimasMedidasRede(req, res) {

    const limite_linhas = 7;

    var idServidor= req.params.idServidor;

    console.log(`Recuperando as ultimas ${limite_linhas} medidas`);

    medidaModel.buscarUltimasMedidasRede(idServidor, limite_linhas).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}


function buscarMedidasEmTempoRealRede(req, res) {

    var idServidor = req.params.idServidor;

    console.log(`Recuperando medidas em tempo real`);

    medidaModel.buscarMedidasEmTempoRealRede(idServidor).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    }); 

}



// fim rede dash

function buscarMedidasEmTempoRealAnalise(req, res) {

    var idChamado = req.params.idChamado;

    console.log(`Recuperando medidas em tempo real`);

    medidaModel.buscarMedidasEmTempoRealAnalise(idChamado).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    }); 

}

function buscarMedidasAnalise(req, res) {
    
        var idChamado = req.params.idChamado;
    
        console.log(`Recuperando medidas em tempo real`);
    
        medidaModel.buscarMedidasEmTempoRealAnalise(idChamado).then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!")
            }
        }).catch(function (erro) {
            console.log(erro);
            console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        }); 
    
    }

    
    // function temperatura
    function buscarMedidasTemp(req, res) {

        const limite_linhas = 6;
        var idServidor = req.params.idServidor;
    
        console.log(`Recuperando medidas em tempo real`);
    
        medidaModel.buscarMedidasTemp(idServidor, limite_linhas).then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!")
            }
        }).catch(function (erro) {
            console.log(erro);
            console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
    }
                ///////////////////////////////////////////////////////////

    function buscarUltimasTemp(req, res) {

    const limite_linhas = 6;

    var idServidor = req.params.idServidor;

    console.log(`Recuperando as ultimas ${limite_linhas} medidas`);

    medidaModel.buscarUltimasTemp(idServidor, limite_linhas)
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!")
            }
        }).catch(function (erro) {
            console.log(erro);
            console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}


function buscarTempoRealTemp(req, res) {

    var idServidor = req.params.idServidor;

    console.log(`Recuperando medidas em tempo real`);

    medidaModel.buscarTempoRealTemp(idServidor).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });

}
    
module.exports = {
    buscarUltimasMedidas,
    buscarMedidasEmTempoReal,
    buscarMedidas,
    buscarMedidasChamados,
    buscarMedidasPalavras,
    ultimasMedidasDisco,
    buscarMedidasDisco,
    buscarMedidasEmTempoRealRede,
    buscarUltimasMedidas,
    buscarMedidasAnalise,
    buscarMedidasEmTempoRealAnalise,
    buscarUltimasMedidasRede,
    buscarMedidasTemp,
    buscarUltimasTemp,
    buscarTempoRealTemp
    // obterDadosComponentes

}




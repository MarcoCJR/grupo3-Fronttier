var express = require("express");
var router = express.Router();

var medidaController = require("../controllers/medidaController");


// rota maquina 1 
router.get("/ultimas/:idServidor", function (req, res) {
    medidaController.buscarUltimasMedidas(req, res);
});

router.get("/tempo-real/:idServidor", function (req, res) {
    medidaController.buscarMedidasEmTempoReal(req, res);
}) 

// fim rota maquina 1 


// rotas Freq
router.get("/ultimasFreq/:idAquario", function (req, res) {
    medidaController.buscarMedidas(req, res);
});

// rota Chamado
router.get("/ultimasAnalise/:idChamado", function (req, res) {
    medidaController.buscarMedidasAnalise(req, res);
});

router.get("/tempo-real-Analise/:idChamado", function (req, res) {
    medidaController.buscarMedidasEmTempoRealAnalise(req, res);
}) 

router.get("/obterDadosComponentes/:idChamado", function (req, res) {
    medidaController.obterDadosComponentes(req, res);
}) 

    
module.exports = router;
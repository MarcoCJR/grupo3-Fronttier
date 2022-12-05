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

// rota maquina 1 
router.get("/ultimasTeste/:idChamado", function (req, res) {
    medidaController.buscarMedidasChamados(req, res);
});

router.get("/buscarMedidasPalavras/:palavra", function (req, res) {
    medidaController.buscarMedidasPalavras(req, res);
});

router.get("/ultimasDisco/:idServidor", function (req, res) {
    medidaController.buscarMedidasDisco(req, res);
});

router.get("/tempo-real-Disco/:idServidor", function (req, res) {
    medidaController.ultimasMedidasDisco(req, res);
});

//rota rede dash

router.get("/ultimasRede/:idServidor", function (req, res) {
    medidaController.buscarUltimasMedidasRede(req, res);
});

router.get("/tempo-real-rede/:idServidor", function (req, res) {
    medidaController.buscarMedidasEmTempoRealRede(req, res);
})

// fim rede dash

router.get("/ultimasAnalise/:idChamado", function (req, res) {
    medidaController.buscarMedidasAnalise(req, res);
});

router.get("/tempo-real-Analise/:idChamado", function (req, res) {
    medidaController.buscarMedidasEmTempoRealAnalise(req, res);
}) 

router.get("/obterDadosComponentes/:idChamado", function (req, res) {
    medidaController.obterDadosComponentes(req, res);
}) 

router.get("/ultimasTemp/:idServidor", function (req, res) {
    medidaController.buscarMedidasTemp(req, res);
});

router.get("/ultimasObterTemp/:idServidor", function (req, res) {
    medidaController.buscarUltimasTemp(req, res);
});

router.get("/tempo-real-temp/:idServidor", function (req, res) {
    medidaController.buscarTempoRealTemp(req, res);
});

module.exports = router;
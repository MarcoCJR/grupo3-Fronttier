var express = require("express");
var router = express.Router();

var medidaController = require("../controllers/medidaController");

router.get("/ultimas/:idServidor", function (req, res) {
    medidaController.buscarUltimasMedidas(req, res);
});

router.get("/tempo-real/:idServidor", function (req, res) {
    medidaController.buscarMedidasEmTempoReal(req, res);
}) 

// rotas Freq
router.get("/ultimasFreq/:idAquario", function (req, res) {
    medidaController.buscarMedidas(req, res);
});


    
module.exports = router;
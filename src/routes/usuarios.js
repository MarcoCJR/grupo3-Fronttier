var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

router.get("/", function (req, res) {
    usuarioController.testar(req, res);
});

router.get("/listar", function (req, res) {
    usuarioController.listar(req, res);
});

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrar", function (req, res) {
    usuarioController.cadastrar(req, res);
})

router.post("/cadastrarU", function (req, res) {
    usuarioController.cadastrarU(req, res);
})

router.post("/cadastrarM", function (req, res) {
    usuarioController.cadastrarM(req, res);
})

router.post("/cadastrarUserDash", function (req, res) {
    usuarioController.cadastrarUserDash(req, res);
})


router.post("/cadastrarTecnico", function (req, res) {
    usuarioController.cadastrarTecnico(req, res);
})


router.post("/nomeEmpresa", function (req, res) {
    usuarioController.nomeEmpresa(req, res);
})

router.post("/autenticar", function (req, res) {
    usuarioController.entrar(req, res);
});


module.exports = router;
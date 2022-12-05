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

router.post("/CadastrarComponente", function (req, res) {
    usuarioController.CadastrarComponente(req, res);
});

router.post("/UltimaMaquina", function (req, res) {
    usuarioController.UltimaMaquina(req, res);
});

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

router.post("/alertas", function (req, res) {
    usuarioController.alertas(req, res);
});

router.post("/obterDadosComponentes", function (req, res) {
    usuarioController.obterDadosComponentes(req, res);
});

router.post("/FiltroComponentes", function (req, res) {
    usuarioController.FiltroComponentes(req, res);
});

module.exports = router;
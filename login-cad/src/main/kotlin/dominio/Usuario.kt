package dominio

class Usuario (
    var idUsuario: Int,
    var nome: String,
    var sobreNome: String,
    var telefone: String,
    var email: String,
    var senha: String,
    var fkCodEmpresa: Int
)

{
    constructor() : this(0, "", "", "", "", "", 0)
}
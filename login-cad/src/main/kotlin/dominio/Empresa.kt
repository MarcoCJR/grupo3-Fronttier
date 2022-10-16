package dominio

class Empresa(
    var codEmpresa: Int,
    var nomeEmpresa: String,
    var cnpj: String
)

{
    constructor() : this(0, "", "")
}
package dominio

class MaquinaServidor (
    var idServidor: Int,
    var fkCodEmpresa: Int,
    var numeroSerial: Int,
    var posicaoLinha: Int,
    var posicaoColuna: Int
)

{
    constructor() : this(0, 0, 0, 0, 0)
}
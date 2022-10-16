package dominio

import java.time.LocalDateTime

class Dados (
    var idDados: Int,
    var fkServidor: Int,
    var dataHora: LocalDateTime,
    var freqMax: Double,
    var percentualCpu: Double,
    var sistemaOperacional: String,
    var memoriaUsada: Double
)

{
    constructor() : this(0, 0, LocalDateTime.now(), 0.0, 0.0, "", 0.0)
}
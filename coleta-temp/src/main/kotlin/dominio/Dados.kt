package dominio

import java.time.LocalDateTime

    class Dados (
        var idDados: Int,
        var percentualCpu: Double,
        var tempAtual: Double,
        var dataHora: LocalDateTime,
    ) {
        constructor() : this(0, 0.0, 0.0,  LocalDateTime.now())
    }
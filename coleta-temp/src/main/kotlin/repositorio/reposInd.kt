package repositorio

import dominio.Dados
import org.springframework.jdbc.core.BeanPropertyRowMapper
import org.springframework.jdbc.core.JdbcTemplate

class reposInd(val jdbcTemplate: JdbcTemplate) {

        fun inserirDados(dados: Dados) {
        jdbcTemplate.update("""
            insert into dadosTemp (percentualCpu, tempAtual, dataHora) values
            (?, ?, ?)
        """, dados.percentualCpu, dados.tempAtual, dados.dataHora)
    }

        fun listarDados():List<Dados> {
        return jdbcTemplate.query("select * from dadosTemp",
            BeanPropertyRowMapper(Dados::class.java)
        )
    }


}
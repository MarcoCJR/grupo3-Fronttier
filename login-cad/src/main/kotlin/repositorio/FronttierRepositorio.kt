package repositorio

import dominio.Dados
import dominio.Empresa
import dominio.MaquinaServidor
import dominio.Usuario
import org.springframework.jdbc.core.BeanPropertyRowMapper
import org.springframework.jdbc.core.JdbcTemplate

class FronttierRepositorio(val jdbcTemplate: JdbcTemplate) {

    fun inserirEmpresa(fronttierRepositorio: Empresa) {
        jdbcTemplate.update("""
            insert into Empresa (codEmpresa, nomeEmpresa, cnpj) values
            (?, ?, ?)
        """, fronttierRepositorio.codEmpresa, fronttierRepositorio.nomeEmpresa, fronttierRepositorio.cnpj)
    }

    fun inserirUser(fronttierRepositorio: Usuario) {
        jdbcTemplate.update("""
            insert into Usuario (nome, sobreNome, telefone, email, senha, fkCodEmpresa) values
            (?, ?, ?, ?, ?, ?)
        """, fronttierRepositorio.nome, fronttierRepositorio.sobreNome, fronttierRepositorio.telefone, fronttierRepositorio.email, fronttierRepositorio.senha, fronttierRepositorio.fkCodEmpresa)
    }

    fun validarCodigo(codEmpresa: Int):Boolean {
        val contagem = jdbcTemplate.queryForObject(
            "select count(*) from Empresa where codEmpresa = ?",
            Int::class.java,
            codEmpresa
        )
        return contagem == 1
    }

    fun validarLogin(email: String, senha: String, fkCodEmpresa: Int):Boolean {
        val contagem = jdbcTemplate.queryForObject(
            "select count(*) from Usuario where email = ? and senha = ? and fkCodEmpresa = ?",
            Int::class.java,
            email, senha, fkCodEmpresa
        )
        return contagem == 1
    }

    fun inserirMaquina(fronttierRepositorio: MaquinaServidor) {
        jdbcTemplate.update("""
            insert into MaquinaServidor (fkCodEmpresa, numeroSerial, posicaoLinha, posicaoColuna) values
            (?, ?, ?, ?)
        """, fronttierRepositorio.fkCodEmpresa, fronttierRepositorio.numeroSerial, fronttierRepositorio.posicaoLinha, fronttierRepositorio.posicaoColuna)
    }

    fun inserirDados(fronttierRepositorio: Dados) {
        jdbcTemplate.update("""
            insert into dadosKotlin (fkServidor, dataHora, freqMax, percentualCpu, sistemaOperacional, memoriaUsada) values
            (?, ?, ?, ?, ?, ?)
        """, fronttierRepositorio.fkServidor, fronttierRepositorio.dataHora, fronttierRepositorio.freqMax, fronttierRepositorio.percentualCpu, fronttierRepositorio.sistemaOperacional, fronttierRepositorio.memoriaUsada)
    }

    fun listarDadosLimite(limitador: Int):List<Dados> {
        return jdbcTemplate.query("select * from dadosKotlin order by idDados desc limit ?",
            BeanPropertyRowMapper(Dados::class.java),
            limitador
        )
    }

    fun listarDados():List<Dados> {
        return jdbcTemplate.query("select * from dadosKotlin",
            BeanPropertyRowMapper(Dados::class.java))
    }
}
package configuracao


fun main() {

    val jdbcTemplate = Conexao().getJdbcTemplate()

    jdbcTemplate.execute("""
          
        CREATE TABLE IF NOT EXISTS dadosTemp(
            idDados INT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
            percentualCpu DECIMAL(4,1) NOT NULL,
            tempAtual DECIMAL (4,1) NOT NULL,
            dataHora TIMESTAMP NOT NULL
        );
    """)
}
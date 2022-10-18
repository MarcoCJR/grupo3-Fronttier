package configuracao

fun main() {

    val jdbcTemplate = Conexao().getJdbcTemplate()

    jdbcTemplate.execute("""
        create table IF NOT EXISTS Empresa (
            codEmpresa INT PRIMARY KEY,
            nomeEmpresa VARCHAR(45) NOT NULL,
            cnpj CHAR(14) NOT NULL
        );
        
        CREATE TABLE IF NOT EXISTS Usuario (
            idUsuario INT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
            nome VARCHAR(45) NOT NULL,
            sobreNome VARCHAR(45) NOT NULL,
            telefone CHAR(15) NOT NULL,
            email VARCHAR(45) NOT NULL,
            senha VARCHAR (45) NOT NULL,
            fkCodEmpresa INT NOT NULL,
            FOREIGN KEY (fkCodEmpresa) REFERENCES Empresa(codEmpresa)
        );
        
        CREATE TABLE IF NOT EXISTS MaquinaServidor (
            idServidor INT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
            fkCodEmpresa INT NOT NULL,
            FOREIGN KEY (fkCodEmpresa) REFERENCES Empresa (codEmpresa),
            numeroSerial INT NOT NULL,
            posicaoLinha INT NOT NULL,
            posicaoColuna INT NOT NULL
        );
        
        CREATE TABLE IF NOT EXISTS dadosKotlin(
            idDados INT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
            fkServidor INT NOT NULL,
            FOREIGN KEY (fkServidor) REFERENCES MaquinaServidor (idServidor),
            dataHora TIMESTAMP NOT NULL,
            freqMax DECIMAL(5,1) NOT NULL,
            percentualCpu DECIMAL(4,1) NOT NULL,
            sistemaOperacional VARCHAR(7) NOT NULL,
            memoriaUsada DECIMAL(5,2)
        );
    """)
}
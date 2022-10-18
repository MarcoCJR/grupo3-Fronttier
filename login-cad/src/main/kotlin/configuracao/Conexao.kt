package configuracao

import org.apache.commons.dbcp2.BasicDataSource
import org.springframework.jdbc.core.JdbcTemplate

class Conexao {
    val driverClassName = "com.microsoft.sqlserver.jdbc.SQLServerDriver"

    //    val url = "jdbc:h2:mem:banco-aula"
    val url = "jdbc:sqlserver://grupo-fronttier3.database.windows.net;databaseName=Fronttier"
    val username = "Fronttier3"
    val password = "#Gfgrupo3"

    fun getJdbcTemplate(): JdbcTemplate {
        val dataSource = BasicDataSource()
        dataSource.driverClassName = driverClassName
        dataSource.url = url
        dataSource.username = username
        dataSource.password = password

        val jdbcTemplate = JdbcTemplate(dataSource)
        return jdbcTemplate
    }
}
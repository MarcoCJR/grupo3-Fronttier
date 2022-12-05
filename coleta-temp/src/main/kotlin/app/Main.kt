package app

import com.github.britooo.looca.api.core.Looca
import configuracao.Conexao
import dominio.Dados
import repositorio.reposInd
import java.time.LocalDateTime
import java.time.format.DateTimeFormatter
import java.util.*
import javax.swing.JOptionPane

fun main() {

    val jdbcTemplate = Conexao().getJdbcTemplate()
    val repositorio = reposInd(jdbcTemplate)

// criando instância do Looca
    val looca = Looca()

// Criando objeto do processador
    val processador = looca.processador

// Criando objeto do Sistema
    val temp = looca.temperatura

            fun coletaDados() {

                Timer().schedule(object : TimerTask() {
                    override fun run() {

                        println("Inserindo dados no banco")
                        // Frequência do processador em mhz
//                        val frequencia = processador.frequencia.toDouble() / 1000000

                        // Uso da CPU em %
                        val cpu = processador.uso

                        // Temperatura
                        val temperatura = temp.temperatura


                        val dados = Dados(0, cpu, temperatura, LocalDateTime.now())
                        repositorio.inserirDados(dados)

                        coletaDados()

                        val mensagemTodas = repositorio.listarDados()

                        val formatoDH = DateTimeFormatter
                            .ofPattern("dd/MM/yyyy HH:mm:ss")
                        var mensagem = ""

                        mensagemTodas.forEach {
                            mensagem += "ID: ${it.idDados}\r\n Percentual de uso cpu: ${it.percentualCpu}%-" +
                                    "Temperatura atual: ${it.tempAtual}C° \r\n Data e hora: ${it.dataHora.format(formatoDH)}"
                        }


                      val teste =  JOptionPane.showMessageDialog(null, "${mensagem}").toString()

                        JOptionPane.showMessageDialog(null, "$teste")
                    }

                }, 3000)



            }

                    coletaDados()

        }


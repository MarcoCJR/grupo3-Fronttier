package app

import com.github.britooo.looca.api.core.Looca
import configuracao.Conexao
import dominio.Dados
import dominio.Empresa
import dominio.MaquinaServidor
import dominio.Usuario
import repositorio.FronttierRepositorio
import java.time.LocalDateTime
import java.time.format.DateTimeFormatter
import java.util.Timer
import java.util.TimerTask
import javax.swing.JOptionPane.*

val jdbcTemplate = Conexao().getJdbcTemplate()
val repositorio = FronttierRepositorio(jdbcTemplate)


// criando instância do Looca
val looca = Looca()

// Criando objeto do processador
val processador = looca.processador

// Criando objeto do Sistema
val sistema = looca.sistema

// Criando objeto da Memória Ram
val memoria = looca.memoria

open class Main {
    companion object {
        @JvmStatic
        fun main(args: Array<String>) {

            while (true) {

                val logOuCad =
                    showInputDialog("Gostaria de: \r\n 1- Fazer Login (apenas funcionários) \r\n 2- Fazer Cadastro")
                        .toInt()


                /* INÍCIO CADASTRO EMPRESA*/
                if (logOuCad == 2) {


                    val qualCad = showInputDialog("Gostaria de cadastrar: \r\n 1- Empresa \r\n 2- Funcionario").toInt()

                    val nmrI = (1..10).random()
                    val nmrII = (1..10).random()

                    val respostaCorreta = nmrI + nmrII

                    /* INSERIR INFORMAÇÕES */

                    if (qualCad == 1) {
                        val codigoEmp = showInputDialog("Insira o código da sua empresa").toInt()
                        val nomeEmp = showInputDialog("Nome da empresa")
                        val cnpjEmp = showInputDialog("Insira seu CNPJ")

                        val empresa = Empresa(codigoEmp, nomeEmp, cnpjEmp)


                        if (cnpjEmp.count() != 14) {
                            showMessageDialog(null, "Atenção! CNPJ deve conter 14 números e nenhum caractere especial!")
                        } else {

                            while (true) {
                                val respostaUsuario = showInputDialog("Resposta do CAPTCHA \r\n $nmrI + $nmrII").toInt()

                                if (respostaCorreta != respostaUsuario) {
                                    showMessageDialog(null, "Resposta errada! Tente novamente.")

                                } else {
                                    showMessageDialog(null, "Resposta correta!")

                                    /* Inserindo no banco */
                                    repositorio.inserirEmpresa(empresa)

                                    showMessageDialog(
                                        null, "Empresa cadastrada: \r\n " +
                                                "Nome: $nomeEmp, \n " +
                                                "CNPJ: $cnpjEmp, \n" +
                                                "Código: $codigoEmp"
                                    )
                                    break
                                }
                            }
                        }
                        /* FIM DO CADASTRO EMPRESA*/


                        /* INICIO DO CADASTRO FUNCIONARIO */
                    } else if (qualCad == 2) {
                        val nome = showInputDialog("Insira seu nome:")
                        val sobreNome = showInputDialog("Insira seu sobrenome:")
                        val telefone = showInputDialog("Insira seu telefone:")
                        val email = showInputDialog("Insira seu email:")
                        val senha = showInputDialog("Insira sua senha:")
                        val codEmpresa = showInputDialog("Insira o código da empresa:").toInt()

                        val funcionario = Usuario(0, nome, sobreNome, telefone, email, senha, codEmpresa)

                        /* INICIO VALIDAÇOES */

                        val valEmail = email.contains("@")


                        if (!valEmail) {
                            showMessageDialog(null, "Email inválido! Deve conter @")
                        } else if (telefone.count() != 11) {
                            showMessageDialog(
                                null,
                                "Atenção! O telefone deve conter 11 números! (Sem caracteres especiais)"
                            )
                        } else {

                            while (true) {
                                val respostaUsuario = showInputDialog("Resposta do CAPTCHA \r\n $nmrI + $nmrII").toInt()

                                if (respostaCorreta != respostaUsuario) {
                                    showMessageDialog(null, "Resposta errada! Tente novamente.")
                                } else {
                                    showMessageDialog(null, "Resposta correta!")

                                    /* FIM DAS VALIDAÇÕES */

                                    /* INSERINDO NA TABELA USUÁRIO SOMENTE SE ACHAR O CÓDIGO DA EMPRESA*/
                                    if (repositorio.validarCodigo(codEmpresa)) {

                                        repositorio.inserirUser(funcionario)

                                        showMessageDialog(
                                            null, "Usuario cadastrado: \r\n " +
                                                    "Nome: $nome, \n " +
                                                    "Sobrenome: $sobreNome, \n" +
                                                    "Telefone: $telefone, \n" +
                                                    "Email: $email, \n" +
                                                    "Senha: $senha, \n" +
                                                    "Código: $codEmpresa,"
                                        )
                                    } else {

                                        showMessageDialog(null, "Código da empresa não encontrado no banco!")
                                        break
                                    }

                                    break
                                }
                            }
                        }

                    }
                    /* FIM DO CADASTRO DE FUNCIONÁRIOS */


                    /* INÍCIO DO LOGIN DE FUNCIONÁRIOS*/

                } else if (logOuCad == 1) {

                    val emailLogin = showInputDialog("Insira seu Email")
                    val senhaLogin = showInputDialog("Insira sua senha")
                    val empresaLogin = showInputDialog("Código da Empresa").toInt()


                    /* FIM DO LOGIN E INÍCIO DO CADASTRO DE MÁQUINA OU SELEÇÃO DE DADOS*/
                    if (repositorio.validarLogin(emailLogin, senhaLogin, empresaLogin)) {
                        while (true) {
                            val opcao = showInputDialog(
                                "Login realizado com sucesso! \r\n \n" +
                                        "\n Digite cadastrar se deseja cadastrar uma nova máquina \n\n" +
                                        "Digite ver se deseja ver os dados da máquina \n\n" +
                                        "Qualquer valor que não seja os citados, finalizará o processo \n"
                            )


                            if (opcao == "cadastrar") {
                                val numeroSerial = showInputDialog("Insira o número serial da máquina:").toInt()
                                val posicaoLinha = showInputDialog("Insira a posição horizontal da máquina:").toInt()
                                val posicaoColuna = showInputDialog("Insira a posição vertical da máquina:").toInt()

                                val maquina =
                                    MaquinaServidor(0, empresaLogin, numeroSerial, posicaoLinha, posicaoColuna)
                                repositorio.inserirMaquina(maquina)

//                          A função é chamada aqui pois senão, a fkServidor ficaria em branco
                                coletaDados()

                                showMessageDialog(
                                    null, "Usuario cadastrado: \r\n " +
                                            "Serial Code: $numeroSerial, \n " +
                                            "Posição na Fileira: $posicaoLinha, \n" +
                                            "Coluna da Máquina:: $posicaoColuna"
                                )

                            } else if (opcao == "ver") {

                                val escolha = showInputDialog(
                                    "Digite limitado se deseja ver apenas um número específico de dados \r\n" +
                                            "Ou digite ilimitado se deseja ver todos os dados capturados"
                                )

                                if (escolha == "limitado") {
                                    val formatoDH = DateTimeFormatter
                                        .ofPattern("dd/MM/yyyy HH:mm:ss")

                                    val limitador = showInputDialog("Digite quantos dados deseja ver").toInt()

                                    val dadosLimitados = repositorio.listarDadosLimite(limitador)

                                    var mensagemDados = "${dadosLimitados.size} dados encontrados: \r\n"

                                    dadosLimitados.forEach {
                                        mensagemDados += "Id: ${it.idDados} - Máquina: ${it.fkServidor} - Data e Hora: ${
                                            it.dataHora.format(
                                                formatoDH
                                            )
                                        } - \r\n" +
                                                "Frequência Máxima: ${it.freqMax}MHz - Uso da CPU: ${it.percentualCpu}% - " +
                                                "Sistema Operacional: ${it.sistemaOperacional} - Uso da Ram: ${it.memoriaUsada}GB \r\n" +
                                                "\r\n"
                                    }

                                    showMessageDialog(null, mensagemDados)

                                } else if (escolha == "ilimitado") {
                                    val formatoDH = DateTimeFormatter
                                        .ofPattern("dd/MM/yyyy HH:mm:ss")

                                    val dadosIlimitados = repositorio.listarDados()

                                    var mensagemDados = "${dadosIlimitados.size} dados encontrados: \r\n"

                                    dadosIlimitados.forEach {
                                        mensagemDados += "Id: ${it.idDados} - Máquina: ${it.fkServidor} - Data e Hora: ${
                                            it.dataHora.format(
                                                formatoDH
                                            )
                                        } - \r\n" +
                                                "Frequência Máxima: ${it.freqMax}MHz - Uso da CPU: ${it.percentualCpu}% - " +
                                                "Sistema Operacional: ${it.sistemaOperacional} - Uso da Ram: ${it.memoriaUsada}GB \r\n" +
                                                "\r\n"
                                    }

                                    showMessageDialog(null, mensagemDados)
                                }


                            } else {
                                break
                            }
                        }

                    } else {
                        showMessageDialog(null, "Dados não encontrados no banco! Tente novamente.")
                    }

                }
            }
        }

        fun coletaDados() {

            Timer().schedule(object : TimerTask() {
                override fun run() {

                    println("Inserindo dados no banco")
                    // Frequência do processador em mhz
                    val frequencia = processador.frequencia.toDouble() / 1000000

                    // Uso da CPU em %
                    val cpu = processador.uso

                    // Sistema Operacional
                    val so = sistema.sistemaOperacional

                    // Memória RAM em GB
                    val ram = (memoria.emUso.toDouble() / 1024 / 1024 / 1024)

                    val dados = Dados(0, 7, LocalDateTime.now(), frequencia, cpu, so, ram)
                    repositorio.inserirDados(dados)

                    coletaDados()
                }
            }, 3000)
        }

    }
}
import javax.swing.JOptionPane.*

fun main() {
    val cadastros = mutableListOf<Cadastro>()

    while (true) {

        val logOuCad =
            showInputDialog("Gostaria de: \r\n 1- Fazer Login (apenas funcionários) \r\n 2- Fazer Cadastro").toInt()

        /* INICIO CADASTRO EMPRESA*/
        if (logOuCad == 2) {


            val qualCad = showInputDialog("Gostaria de cadastrar: \r\n 1- Empresa \r\n 2- Funcionario").toInt()

            val nmrI = (1..10).random()
            val nmrII = (1..10).random()

            val respostaCorreta = nmrI + nmrII

            /* INCERIR INFORMAÇÕES */

            if (qualCad == 1) {
                val cadI = Cadastro()
                cadI.nome = showInputDialog("Nome da empresa")
                cadI.cnpj = showInputDialog("Insira seu CNPJ")
                cadI.cidade = showInputDialog("Cidade")
                cadI.senha = showInputDialog("Insira sua senha")

                /* VALIDAÇÕES */

                /*
                *  cpnpj.contains("/")
//
//                cnpj.replace("/", "")
                * */

                if (cadI.cnpj.count() != 15) {
                    showMessageDialog(null, "Atenção! CNPJ deve conter 15 números!")
                } else {

                    while (true) {
                        val respostaUsuario = showInputDialog("Resposta do CAPTCHA \r\n $nmrI + $nmrII").toInt()

                        if (respostaCorreta != respostaUsuario) {
                            showMessageDialog(null, "Resposta errada! Tente novamente.")

                        } else {
                            showMessageDialog(null, "Resposta correta!")
                            cadastros.add(cadI)
                            showMessageDialog(null, cadI.descreverEmpresa())
                            break
                        }
                    }
                }

                /* INICIO CADASTRO FUNCIONARIO */
            } else if (qualCad == 2) {
                val cadII = Cadastro()
                cadII.nome = showInputDialog("Nome completo")
                cadII.cpf = showInputDialog("Insira seu CPF")
                cadII.email = showInputDialog("Email")
                cadII.senha = showInputDialog("Insira sua senha")
                cadII.qualEmp = showInputDialog("Nome Empresa")


                /* INICIO VALIDAÇOES */

                val valEmail = cadII.email.contains("@")
                val valEmailII = cadII.email.contains(".com")


                if (!valEmail && !valEmailII) {
                    showMessageDialog(null, "Email inválido!")
                } else if (cadII.cpf.count() != 11) {
                    showMessageDialog(null, "Atenção! CPF deve conter 11 números!")
                } else {

                    while (true) {
                        val respostaUsuario = showInputDialog("Resposta do CAPTCHA \r\n $nmrI + $nmrII").toInt()

                        if (respostaCorreta != respostaUsuario) {
                            showMessageDialog(null, "Resposta errada! Tente novamente.")
                        } else {
                            showMessageDialog(null, "Resposta correta!")
                            cadastros.add(cadII)
                            showMessageDialog(null, cadII.descreverFuncionario())

                            break
                        }
                    }
                }

            }
        } else if (logOuCad == 1) {

            while (true) {
                val emailFuncionario = showInputDialog("Insira seu Email")
                val senhaFuncionario = showInputDialog("Insira sua senha")
                val empresaFuncionario = showInputDialog("Nome da Empresa")

                val loginFuncionario = cadastros[1].email
                val pwrdFuncionario = cadastros[1].senha
                val nomeEmpFuncionario = cadastros[1].qualEmp

                if (emailFuncionario == loginFuncionario && senhaFuncionario == pwrdFuncionario && empresaFuncionario == nomeEmpFuncionario) {
                    showMessageDialog(null, "Login realizado com sucesso!")
                    break

                } else {
                    showMessageDialog(null, "Email ou senha incorretos. Tente novamente!")
                }


            }

        }
    }
}
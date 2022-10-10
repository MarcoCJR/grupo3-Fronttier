class Cadastro {

    lateinit var nome: String
    lateinit var cnpj: String
    lateinit var email: String
    lateinit var cidade:String
    lateinit var senha: String
    lateinit var cpf: String
    lateinit var qualEmp:String


    fun descreverEmpresa():String{
        return "Empresa cadastrada: \r\n Nome: $nome, CNPJ: $cnpj, Cidade: $cidade, Senha: $senha"
    }

    fun descreverFuncionario():String {
        return "Funcionário cadastrado: \r\n Nome: $nome, CPF: $cpf, Empresa: $qualEmp, Email: $email, Senha: $senha"
    }

}

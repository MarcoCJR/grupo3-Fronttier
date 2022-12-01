var database = require("../database/config");

function buscarUltimasMedidas(idServidor, limite_linhas) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `select top ${limite_linhas}
                        percentualCpu, 
                        freqAtual, 
                        discoUsado,
                        memoriaUsada,
                        dataHora,
                        CONVERT(varchar, dataHora, 108) as horario
                        from dados 
                        where fkServidor = ${idServidor}
                    order by idDados desc`;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `select 
        percentualCpu,
        freqAtual,
        discoUsado,
        memoriaUsada,
                        dataHora,
                        DATE_FORMAT(dataHora,'%H:%i:%s') as horario,
                        fkServidor
                    from dados
                    where fkServidor = ${idServidor} 
                    order by idDados desc limit ${limite_linhas}`;
    }
    else {

        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarMedidasEmTempoReal(idServidor) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `select top 1
                        percentualCpu,
                        freqAtual,
                        discoUsado,
                        memoriaUsada,
                        dataHora, 
                             CONVERT(varchar, dataHora, 108) as horario,
                             fkServidor
                        from dados 
                        where fkServidor = ${idServidor}
                    order by idDados desc`;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `select  
        percentualCpu,
        freqAtual,
        discoUsado,
        memoriaUsada,
                    dataHora,
                        DATE_FORMAT(dataHora,'%H:%i:%s') as horario,
                        fkservidor 
                        from dados
                        where fkServidor = ${idServidor}
                    order by idDados desc limit 1`;

    }
    else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
} 






// Criação teste freq



function buscarMedidas(idServidor) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `
        select  
        percentualCpu,
        freqAtual,
        discoUsado,
        memoriaUsada,
                    dataHora,
                        DATE_FORMAT(dataHora,'%H:%i:%s') as horario,
                        fkservidor 
                        from dados
                        where fkServidor = ${idServidor}
                    order by idDados desc limit 1
        `;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `select 
        freqAtual,
        percentualCpu,
        discoUsado,
        memoriaUsada
                    from dados  
                    order by idDados desc limit 1`;

    }
    else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
} 





// ÍNICIO ROTA CHAMADOS
function buscarUltimasMedidasAnalise(idChamadoQ) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `select nomeEmp, count(${idChamado}) as 'Qtde_Chamados' from Chamado group by nomeEmp;
        `;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `select nomeEmp, count(idChamado) as 'Qtde_Chamados' from Chamado group by nomeEmp;
        `;
    }
    else {

        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


function buscarMedidasEmTempoRealAnalise(idChamado) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `select nomeEmp, count(${idChamado}) as 'Qtde_Chamados' from Chamado group by nomeEmp;
        `;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `select nomeEmp, count(idChamado) as 'Qtde_Chamados' from Chamado group by nomeEmp;`;

    }
    else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
} 

function obterDadosComponentes(idChamado,nomeEmp) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `select componente, count((case when metrica = 'Alerta' then metrica end)) as Alerta, count((case when metrica = 'Emergência' then metrica end)) as Emergência, count((case when metrica = 'Crítico' then metrica end)) as Crítico from Chamado where nomeEmp = '${nomeEmp}' group by componente;
        `;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `select nomeEmp, count(idChamado) as 'Qtde_Chamados' from Chamado group by nomeEmp;`;

    }
    else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
} 

// FINALIZAÇÃO ROTAS CHAMADOS

module.exports = {
    buscarUltimasMedidas,
    buscarMedidasEmTempoReal,
    buscarMedidas, 
    buscarUltimasMedidasAnalise,
    buscarMedidasEmTempoRealAnalise,
    // obterDadosComponentes
}

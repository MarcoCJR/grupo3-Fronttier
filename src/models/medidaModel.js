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

function buscarMedidas(idServidor, limite_linhas) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `
        select top 1
        percentualCpu,
        freqAtual,
        discoUsado,
        memoriaUsada,
                    dataHora,
                        CONVERT(varchar, dataHora, 108) as horario,
                        fkServidor 
                        from dados
                        where fkServidor = ${idServidor}
                    order by idDados desc
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

function buscarMedidasChamados(idChamado) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `
        select componente, count(${idChamado}) as "qtd" from Chamado where componente in ('CPU', 'RAM', 'Disco') group by componente;
        `;
    } 
    else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
} 

function buscarMedidasPalavras(palavra) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `
        SELECT top 20 count(${palavra}) as 'qtd50', palavra FROM Reclamacoes GROUP BY palavra HAVING COUNT(${palavra}) > 1 ORDER BY count(${palavra}) DESC;
        `;
        console.log("eu fui")
    } 
    else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
} 

function ultimasMedidasDisco(idServidor, limite_linhas) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `select top ${limite_linhas}
                        discoTotal, 
                        discoUso, 
                        discoLivre,
                        porcentagem,
                        discoLido,
                        discoEscrito,
                        dataHora,
                        CONVERT(varchar, dataHora, 108) as horario
                        from dados 
                        where fkServidor = ${idServidor}
                    order by idDados desc`;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `select 
        discoTotal,
        discoUso,
        discoLivre,
        porcentagem,
        discoLido,
        discoEscrito,
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


function buscarMedidasDisco(idServidor) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `select top 1
                        discoTotal,
                        discoUso,
                        discoLivre,
                        porcentagem,
                        discoLido,
                        discoEscrito,
                        dataHora, 
                             CONVERT(varchar, dataHora, 108) as horario,
                             fkServidor
                        from dados 
                        where fkServidor = ${idServidor}
                    order by idDados desc`;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `select  
        discoTotal,
        discoUso,
        discoLivre,
        porcentagem,
        discoLido,
        discoEscrito,
                    dataHora,
                        DATE_FORMAT(dataHora,'%H:%i:%s') as horario,
                        fkServidor 
                        from dados
                        where fkServidor = ${idServidor}
                    order by idDisco desc limit 7`;

    }
    else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}  

// Rede dash

function buscarUltimasMedidasRede(idServidor, limite_linhas) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `select top ${limite_linhas}
                        download, 
                        upload, 
                        ping,
                        CONVERT(varchar, dataHora, 108) as horario
                        from dados 
                    order by idDados desc`;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `select 
        download,
        upload,
        ping,
            dataHora,
                    DATE_FORMAT(dataHora,'%H:%i:%s') as horario
                    from Dados
                    order by idDados desc limit ${limite_linhas}`;
    }
    else {

        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


function buscarMedidasEmTempoRealRede(idServidor) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `select top 1
                        download,
                        upload,
                        ping, 
                             CONVERT(varchar, dataHora, 108) as horario
                        from dados 
                    order by idDados desc`;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `select 
        download,
        upload,
        ping,
            dataHora,
                    DATE_FORMAT(dataHora,'%H:%i:%s') as horario
                    from Dados
                    order by idDados desc limit 1`;

    }
    else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
} 

// fim rede dash

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

function buscarUltimasTemp(idServidor, limite_linhas) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `select top ${limite_linhas}
                        percentualCpu, 
                        tempCpu 
                        dataHora,
                        CONVERT(varchar, dataHora, 108) as horario
                        from dadosTemp 
                        where fkServidor = ${idServidor}
                    order by idDadosTemp desc`;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `select 
        percentualCpu,
        tempAtual,
                        dataHora,
                        DATE_FORMAT(dataHora,'%H:%i:%s') as horario,
                        fkServidor
                    from dadosTemp
                    where fkServidor = ${idServidor} 
                    order by idDadosTemp desc limit ${limite_linhas}`;
    }
    else {

        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarTempoRealTemp(idServidor) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `select top 6
                        percentualCpu,
                        tempAtual,
                        dataHora, 
                             CONVERT(varchar, dataHora, 108) as horario,
                             fkServidor
                        from dadosTemp 
                        where fkServidor = ${idServidor}
                    order by idDadosTemp desc`;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `select  
        percentualCpu,
        tempAtual,
                    dataHora,
                        DATE_FORMAT(dataHora,'%H:%i:%s') as horario,
                        fkServidor 
                        from dadosTemp
                        where fkServidor = ${idServidor}
                    order by idDadosTemp desc limit 6`;

    }
    else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarMedidasTemp(idServidor) {

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
        idDadosTemp,
        fkServidor,
        percentualCpu,
        tempAtual
                    from dadosTemp
                    where fkServidor = ${idServidor}
                    order by idDadosTemp desc `;

    }
    else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
} 


module.exports = {
    buscarUltimasMedidas,
    buscarMedidasEmTempoReal,
    buscarMedidas, 
    buscarUltimasMedidasAnalise,
    buscarMedidasEmTempoRealAnalise,
    // obterDadosComponentes
    buscarMedidas,
    buscarMedidasChamados,
    buscarMedidasPalavras,
    ultimasMedidasDisco,
    buscarMedidasDisco,
    buscarUltimasMedidasRede,
    buscarMedidasEmTempoRealRede,
    buscarUltimasTemp,    
    buscarTempoRealTemp,
    buscarMedidasTemp
}

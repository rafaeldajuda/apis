//DIAS MAIS QUENTES E FRIOS
var quenteFrio = [];
var listaMeses = [];
for (var i = 0; i < temperaturas.length; i++) {
    var quente = -99;
    var frio = 99;
    var data = temperaturas[i].temperatureDate.substring(0, 10);
    var mes = temperaturas[i].temperatureDate.substring(5, 7);
    var dia_q = 99
    var dia_f = 99;

    if (listaMeses.includes(mes)) {
        continue;
    }

    for (var j = 0; j < temperaturas.length; j++) {
        if (mes == temperaturas[j].temperatureDate.substring(5, 7)) {

            if (quente <= temperaturas[j].temperature) {
                quente = temperaturas[j].temperature;
                dia_q = temperaturas[j].temperatureDate.substring(8, 10)
            }

            if (frio >= temperaturas[j].temperature) {
                frio = temperaturas[j].temperature;
                dia_f = temperaturas[j].temperatureDate.substring(8, 10)
            }
        }
    }

    if (quente == -99) {
        quente = "--";
    }

    if (frio == 99) {
        frio = "--";
    }

    if (dia_q == 99) {
        dia_q = "--";
    }

    if (dia_f == 99) {
        dia_f = "--";
    }

    var item = {};
    item.quente = quente;
    item.frio = frio;
    item.dia_q = dia_q;
    item.dia_f = dia_f;
    item.mes = mes;
    quenteFrio.push(item);

    listaMeses.push(mes);
}

//DICI MESES
var dici_semestre_1 = {
    "1": "Janeiro",
    "2": "Fevereiro",
    "3": "Março",
    "4": "Abril",
    "5": "Maio",
    "6": "Junho"
}

var dici_semestre_2 = {
    "7": "Julho",
    "8": "Agosto",
    "9": "Setembro",
    "10": "Outubro",
    "11": "Novembro",
    "12": "Dezembro"
}

//PEGAR TABELA
var tabela = document.querySelector("table");

//PRIMEIRO SEMESTRE ///////////////////////////////////
tabela.appendChild(criarTr(quenteFrio ,dici_semestre_1));

//SEGUNDO SEMESTRE  ///////////////////////////////////
tabela.appendChild(criarTr(quenteFrio ,dici_semestre_2));

function criarTr(quenteFrio, dici_meses) {
    //CRIAR TR
    var tr = document.createElement("tr");

    //ADD TDs
    for (meses in dici_meses) {
        //for(var i = 0; i < 6; i++){
        var mes = meses;
        var item = {};
        item.quente = "--";
        item.frio = "--";
        item.dia_q = "--";
        item.dia_f = "--";
        item.mes = mes;

        for (var j = 0; j < quenteFrio.length; j++) {
            var quenteFrioMes = parseInt(quenteFrio[j].mes);
            if (mes == quenteFrioMes && dici_meses[quenteFrioMes] != undefined) {
                item = quenteFrio[j];
                break;
            }
        }

        tr.appendChild(criarTd(item, dici_meses));
    }

    return tr;
}

function criarTd(item, dici_meses) {
    //CRIAR TD
    var td = document.createElement("td");

    //P - MES
    var p_mes = document.createElement("p");
    p_mes.classList.add("td-titulo");
    p_mes.textContent = dici_meses[parseInt(item.mes)];

    //P - QUENTE
    var p_quente = document.createElement("p");
    p_quente.classList.add("td-info");
    p_quente.textContent = "Dia mais quente: " + item.dia_q + " (" + item.quente + "°C)";

    //P - FRIO
    var p_frio = document.createElement("p");
    p_frio.classList.add("td-info");
    p_frio.textContent = "Dia mais frio: " + item.dia_f + " (" + item.frio + "°C)";

    //CRIAR CELULA
    td.appendChild(p_mes);
    td.appendChild(p_quente);
    td.appendChild(p_frio);

    return td;
}

var temperaturas = httpRequest("GET", "http://localhost:3000/temperaturas", null, {});
temperaturas = JSON.parse(temperaturas);

var listaMediaTemperaturas = [];
var listaIds = [];

//TEMPERATURAS MEDIAS
for (var i = 0; i < temperaturas.length; i++) {
    var data = temperaturas[i].temperatureDate.substring(0, 19);
    var media = 0;
    var qtd = 0;
    for (var j = 0; j < temperaturas.length; j++) {
        if (data.substring(0, 10) == temperaturas[j].temperatureDate.substring(0, 10) && !listaIds.includes(temperaturas[j].id)) {
            media += temperaturas[j].temperature;
            qtd++;
            listaIds.push(temperaturas[j].id);
        }
    }

    if (qtd != 0) {
        var item = [];
        item[0] = new Date(data);
        item[1] = parseFloat((media / qtd).toFixed(2));
        listaMediaTemperaturas.push(item);
    }
}

if(listaMediaTemperaturas.length > 30){
    var dif = listaMediaTemperaturas.length - 30;
    listaMediaTemperaturas.slice(0, dif);
}

function httpRequest(metodo, url, body, headers,) {
    const xhr = new XMLHttpRequest();

    //OPEN CONNECTION
    xhr.open(metodo, url, false);

    //ADD HEADERS
    for (var h in headers) {
        xhr.setRequestHeader(h, headers[h]);
    }

    //res.status(200).json(url);

    //SEND REQUEST
    xhr.send(body);

    /*
    xhr.addEventListener('load', () => {
        console.log(xhr.responseText);
    });
    */
    return xhr.responseText;
}
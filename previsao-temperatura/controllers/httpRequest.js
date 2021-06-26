const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

function httpRequest(metodo, url, body, headers, res, callback){
    const xhr = new XMLHttpRequest();

    //OPEN CONNECTION
    xhr.open(metodo, url);
    
    //ADD HEADERS
    for(var h in headers){
        xhr.setRequestHeader(h, headers[h]);
    }

    //res.status(200).json(url);

    //SEND REQUEST
    xhr.send(body);

    xhr.addEventListener('load', () => {
        callback(res, xhr.status, xhr.responseText);
        //res.status(xhr.status).json(JSON.parse(xhr.responseText));
    });
    

}

module.exports = httpRequest;
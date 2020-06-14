const http = require('http');


const test = {
    'dateStart': '2020-01-01',
    'cols': ['date',
    'location',
    'Plastic_Take_Out_Containers',
    'Foam_Take_Out_Containers'] ,
    'dateEnd': '2020-02-01',
    'locations': ['Avila', 'Avila2']
}


let queryString = "";
        if (test !== null) {
            queryString = "?" + Object.keys(test).map((key) => {
                return encodeURIComponent(key) + '=' + encodeURIComponent(test[key])
            }).join('&');
        }

let options = {
    host: 'localhost',
    port: 8000,
    path: '/byCols?' + queryString,
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    }
};


let req = http.request(options, (res) => {
    console.log('STATUS: ' + res.statusCode);
    console.log('HEADERS ' + JSON.stringify(res.headers));
    res.setEncoding('utf8');
    res.on('data', (chunk) => {
        console.log('BODY: ' + chunk);
    });
});

req.on('error', (e) => {
    console.log('problem with request: ' + e.message);
});

req.end();

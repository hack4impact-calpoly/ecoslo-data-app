const http = require('http');


const test = {
    dateStart: '2004-01-01',
    dateEnd: '2022-02-01',
    cols: 
        ['date',
        'location',
        'Plastic_Take_Out_Containers',
        'Foam_Take_Out_Containers'],
    locations: ['*'],
    groupBy: ['month', 'location']
    // groupBy: JSON.stringify({
    //     date: false,
    //     month: true,
    //     year: false,
    //     monYear: false,
    //     location: true,
    //     eventName: false
    // })
}

let queryString = "";
        if (test !== null) {
            queryString = "?" + Object.keys(test).map((key) => {
                return encodeURIComponent(key) + '=' + encodeURIComponent(test[key])
            }).join('&');
        }

console.log(queryString);
let options = {
    host: 'localhost',
    port: 8000,
    path: '/sumPerCol' + queryString,
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
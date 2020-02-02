const Database = require('./database');

const database = Database.create(null);

let row = {
    test1: '1',
    test2: '2',
    test3: '3',
    test4: '4'
}

database.add(row);
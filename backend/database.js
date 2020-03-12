const {Pool} = require('pg');
const Errors = require('./errors');

module.exports = class Database {
    constructor(pool) {
        this._possibleKeys = new Set(['date', 'location', 'Cigarette_Butts', 'Food_Wrappers', 'Plastic_Take_Out_Containers', 'Foam_Take_Out_Containers',
        'Plastic_Bottle_Caps',
        'Metal_Bottle_Caps',
        'Plastic_Lids',
        'Straws_And_Stirrers',
        'Forks_Knives_And_Spoons',
        'Plastic_Beverage_Bottles',
        'Glass_Beverage_Bottles',
        'Beverage_Cans',
        'Plastic_Grocery_Bags',
        'Other_Plastic_Bags',
        'Paper_Bags',
        'Paper_Cups_And_Plates',
        'Plastic_Cups_And_Plates',
        'Foam_Cups_And_Plates',
        'Fishing_Buoys_Pots_And_Traps',
        'Fishing_Net_And_Pieces',
        'Fishing_Line',
        'Rope',
        'Six_Pack_Holders',
        'Other_Plastic_Or_Foam_Packaging',
        'Other_Plastic_Bottles',
        'Strapping_Bands',
        'Tobacco_Packaging_Or_Wrap',
        'Appliances',
        'Balloons',
        'Cigar_Tips',
        'Cigarette_Lighters',
        'Construction_Materials',
        'Fireworks',
        'Tires',
        'Condoms',
        'Diapers',
        'Syringes',
        'Tampons',
        'Foam_Pieces',
        'Glass_Pieces',
        'Plastic_Pieces'
]);

        this._connection = pool;
    }

    static create(env) {
        if (env == null) {
            return new Database(new Pool());
        }
        return null;
    }

    _validateColNames (data) {
        console.log("here!");
        console.log(data);
        console.log("after")
        var index;
        for(index=0; index < data.length; index++) {
            if (!this._possibleKeys.has(data[index]) && data[index] !== "*") {
                console.log("in error loop");
                return false;
            }
        }
        return true;
    }
    
    _validateData(data) {
        for (let key of Object.keys(data)) {
            console.log(key);
            if (!this._possibleKeys.has(key)) {
                return false;
            }
        }
        return true;
    }

    _createArgStr(row) {
        let str = '';
        Object.keys(row).forEach((key, index) => {
            if (index > 0) {
                str += ', ';
            }
            str += key;
        })
        return str;
    }

    _createValStr(row) {
        let str = '';
        Object.keys(row).forEach((key, index) => {
            if (index > 0) {
                str += ', ';
            }
            str += '$' + (index + 1);
        })
        return str;
    }

    _createRowQuery(row) {
        console.log("create row string");
        const argStr = this._createArgStr(row);
        const valStr = this._createValStr(row);
        const queryStr = 'INSERT INTO cleanupData (' + argStr + ') VALUES(' + valStr + ')';
        console.log(queryStr);
        return queryStr;
    }

    _validateDateRange(startDate, endDate) {
        if (startDate!=null && endDate!=null){
            return true;
        }
        else false;
    }

    _createUpdateQuery(colNames, vals, date, location) {
        var queryStr = 'UPDATE cleanupData SET ';
        if(colNames.length != vals.length){
            throw new Error(Error.badData);
        }
        for(var i =0; i < colNames.length; i++){
            queryStr+= colNames[i] + ' = ' + vals[i];
            if(i!=(colNames.length-1)){
                queryStr+= ', '
            }
        }
        queryStr+= ' WHERE date= \''+date+ '\' AND location= \'' + location + '\''

        return queryStr;
    }

    _createSelectQuery(colNames, dateStart, dateEnd, locations) {
        console.log("create col names string");
        var queryStr = 'SELECT ';
        var i;
        var continuing = false;
        for(i=0; i < colNames.length; i++){
            console.log("inside");
            queryStr = queryStr.concat(colNames[i]);
            if (i != (colNames.length - 1)){
                queryStr = queryStr.concat(', ');
            }
        }
        queryStr+= ' FROM cleanupData'
        if(this._validateDateRange(dateStart, dateEnd)){
            queryStr += ' WHERE (date BETWEEN \'' + dateStart + '\' AND \'' + dateEnd + '\')';
            if(locations!== null && locations.length !== 0){
                continuing=true;
            }
        }

        if(locations !== null && locations.length > 0 && locations[0] !== ''){
            if(continuing) {
                queryStr += ' AND ('
            }
            else {
                queryStr+= ' WHERE ('
            }

            for(i=0; i < locations.length; i++){
                if(i===(locations.length-1)){
                    queryStr += 'location = \'' + locations[i] + '\''
                }
                else{
                    queryStr += 'location = \'' + locations[i] + '\' OR '
                }
            }
            queryStr+= ')'
        }
        return queryStr;
    }


    async add(row) {
        console.log("adding");
        if (!this._validateData(row)) {
            console.log("bad data!");
            throw new Error(Errors.badData);
        }
        const queryStr = this._createRowQuery(row);
        try {
            console.log("here9");
            console.log(row);
            await this._connection.query(queryStr, Object.values(row));
        } catch (err) {
            console.log("here db");
            throw new Error(Errors.queryError);
        }
    }

    async getLocations() {
        console.log("getting locations");
        const queryStr = 'SELECT DISTINCT location FROM cleanupData';
        try {
            const result = await this._connection.query(queryStr);
            let locations = [];
            for (const obj of result.rows) {
                locations.push(obj['location']);
            }
            return locations;
        } catch (err) {
            throw new Error(Errors.queryError);
        }
    }

    async getCols() {
        const queryStr = 'SELECT * FROM cleanupData';
        try {
            const result = await this._connection.query(queryStr);
            console.log("result:", result.rows);
            return result;
        } catch (err) {
            throw new Error(Errors.queryError);
        }
    }

    async getByCol(req) {
        // if (!this._validateColNames(req.cols)) {
        //     console.log("bad data!");
        //     throw new Error(Errors.badData);
        // }
        console.log(req.dateStart, req.dateEnd);
        const queryStr = this._createSelectQuery(req.cols, req.dateStart, req.dateEnd, req.locations);
        console.log(queryStr);
        try {
            let result = await this._connection.query(queryStr);
            console.log(result)
            return result;
        } catch (err) {
            throw new Error(Errors.queryError);
        }
    }

    async update(req) {
        // if (!this._validateColNames(req.body.cols)) {
        //     console.log("bad data!");
        //     throw new Error(Errors.badData);
        // }
        if(req.body.date == null || req.body.location == null){
            throw new Error(Errors.badData);
        }
        
        const queryStr = this._createUpdateQuery(req.body.cols, req.body.vals, req.body.date, req.body.location);
        console.log(queryStr);
        try {
            const result = await this._connection.query(queryStr);
            return result;
        } catch (err) {
            throw new Error(Errors.queryError);
        }
    }


    async database(req) {
        if (!this._validateColNames(req.body.cols)) {
            console.log("bad data!");
            throw new Error(Errors.badData);
        }
        console.log(req.body.dateStart, req.body.dateEnd);
        const queryStr = this._createSelectQuery(req.body.cols, req.body.dateStart, req.body.dateEnd, req.body.locations);
        console.log(queryStr);
        try {
            const result = await this._connection.query(queryStr);
            console.log(result)
        } catch (err) {
            throw new Error(Errors.queryError);
        }
    }

    


}
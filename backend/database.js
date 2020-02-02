const {Pool} = require('pg');
const Errors = require('./errors');

module.exports = class Database {
    constructor(pool) {
        this._possibleKeys = new Set(['test1', 'test2', 'test3', 'test4']);
        this._connection = pool;
    }

    static create(env) {
        if (env == null) {
            return new Database(new Pool());
        }
        return null;
    }
    
    _validateData(data) {
        for (let key of Object.keys(data)) {
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
        const argStr = this._createArgStr(row);
        const valStr = this._createValStr(row);
        const queryStr = 'INSERT INTO cleanups(' + argStr + ') VALUES(' + valStr + ')';
        return queryStr;
    }

    async add(row) {
        if (!this._validateData(row)) {
            throw new Error(Errors.badData);
        }
        const queryStr = this._createRowQuery(row);
        try {
            await this._connection.query(queryStr, Object.values(row));
        } catch (err) {
            throw new Error(Errors.queryError);
        }
    }
}
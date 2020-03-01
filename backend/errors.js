const stringError = new Map([
    [0, 'badData'], 
    [1, 'queryData'], 
    [2, 'success'], 
    [3, 'badAuth']
]);

module.exports.error = Object.freeze({
    badData: 0,
    queryError: 1,
    success: 2,
    badAuth: 3
})

module.exports.stringError = (errNum) => {
    return stringError.get(errNum);
}


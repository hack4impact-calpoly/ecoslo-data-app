const stringError = {
    '0' : 'Invalid data given', 
    '1' : 'Error in database query', 
    '2' : 'success', 
    '3' : 'Invalid credentials'
};

module.exports.error = Object.freeze({
    badData: 0,
    queryError: 1,
    success: 2,
    badAuth: 3
})

module.exports.stringError = (errNum) => {
    return stringError[errNum];
}


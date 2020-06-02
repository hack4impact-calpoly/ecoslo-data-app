const bcrypt = require('bcrypt');

const saltRounds = process.env.SALT_ROUNDS ? +process.env.SALT_ROUNDS : 12; 

const findUserByName = async (username, database) => {
    const userReturned = await database.getUserByUsername(username);
    if (userReturned === null) {
        return false;
    } else {
        return new User(userReturned.username, userReturned.password_hash, userReturned.id);
    }
};

const findUserById = async (id, database) => {
    const userReturned = await database.getUserById(id);
    if (userReturned === null) {
        return false;
    } else {
        return new User(userReturned.username, userReturned.password_hash, userReturned.id);
    }
};

class User {

    constructor(username, passwordHash, userId) {
        this.username = username;
        this.passwordHash = passwordHash;
        this.id = userId;
    }

    async validPassword(passwordToCompare) {
        /* const hash = bcrypt.hashSync(passwordToCompare, saltRounds);
        console.log(hash);
        console.log(this.passwordHash) */
        return bcrypt.compare(passwordToCompare, this.passwordHash);
    }
}

module.exports = {
    findUserByName: findUserByName, User: User, findUserById : findUserById
};
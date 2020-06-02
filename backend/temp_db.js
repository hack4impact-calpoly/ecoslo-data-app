module.exports = {
    getUserByUsername: async (username) => {
        if (username === "temp") {
            return { "username" : username, "password_hash" : "$2b$12$UjFOvYiaQL3lESDph5BdgeK.EPFV7uuSjWoM2PPkjRM0vmNfqHKNC", id : 1 };
        } else {
            return { "username" : username, "password_hash" : "$2b$12$OLiOkL49UkzWCzX1WnMo6.TRaqId.NYhWu/dLTQ5oxLhU8ldIpbEm", id : 2 };
        }
    },

    getUserById: async (id) => {
        if (id === 1) {
            return { "username" : "temp", "password_hash" : "$2b$12$UjFOvYiaQL3lESDph5BdgeK.EPFV7uuSjWoM2PPkjRM0vmNfqHKNC", id : 1 };
        } else {
            return { "username" : "temp", "password_hash" : "$2b$12$OLiOkL49UkzWCzX1WnMo6.TRaqId.NYhWu/dLTQ5oxLhU8ldIpbEm", id : id };
        }
    },

    getLocations : async () => {
        return ['Avila', 'Morro Bay', 'Other'];
    },

    add : async () => {
        return null;
    },
}
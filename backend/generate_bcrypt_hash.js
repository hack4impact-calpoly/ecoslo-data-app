const bcrypt = require('bcrypt');

const saltRounds = process.env.SALT_ROUNDS || 12;
process.stdout.write("Password to hash: ");
process.stdin.on('readable', () => {
    const userInput = process.stdin.read();
    const userInputStripped = userInput.toString().trim();
    const hash = bcrypt.hashSync(userInputStripped, saltRounds);
    if (bcrypt.compareSync(userInputStripped, hash)) {
        if ("password" === userInputStripped) {
            if (!bcrypt.compareSync(userInputStripped, "$2b$12$UjFOvYiaQL3lESDph5BdgeK.EPFV7uuSjWoM2PPkjRM0vmNfqHKNC")) {
                console.log("Password match failed!");
                process.exit(1);
            } else {
                console.log("Password match worked!")
            }
        }
        console.log("Hash to use: " + hash);
        console.log(`INSERT INTO Users (id, username, password_hash) VALUES (DEFAULT, USERNAME, ${hash})`);
    } else {
        console.log("Uh oh...");
    }
});
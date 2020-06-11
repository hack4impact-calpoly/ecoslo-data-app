
<<<<<<< HEAD
const saltRounds = process.env.SALT_ROUNDS ? +process.env.SALT_ROUNDS : 12; 
=======
>>>>>>> parent of ed99211... sessions for login


export default class User{

    static findUser(username, database, callback){
        const saltRounds = 10;
        try{
            const userReturned = await database.getUser(username)
        }
        catch(err){
            return
        }
    }


}
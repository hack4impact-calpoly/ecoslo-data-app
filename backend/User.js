


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
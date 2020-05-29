
 function MakeUserList({database}){
    return Object.freeze({
        GetUsers,
        GetUserById,
        AddUser
    })


    async function GetUsers(){
        const sql=`SELECT * FROM user `
        return ExecuteQuery(sql)
    }

    async function GetUserById(id){
        const sql=`SELECT * FROM user WHERE user.id=${id}`
        return ExecuteQuery(sql)
    }


    async function AddUser({userName,email,password}={}){
        const sql=`INSERT INTO user(userName,email,password) VALUES ('${userName}','${email}','${password}')`
        return ExecuteQuery(sql)
    }

    async function ExecuteQuery(sql){
        return await database.query(sql)
    }

}

module.exports=MakeUserList
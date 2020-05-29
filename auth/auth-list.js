
 function MakeAuthList({database}){
    return Object.freeze({
        findByUserEmailQuery,
        findById
    })


    async function findByUserEmailQuery(email){
        const sql=`SELECT * FROM user WHERE user.email='${email}' `
        return ExecuteQuery(sql)
    }

    async function findById(id){
        const sql=`SELECT * FROM user WHERE user.id=${id}`
        return ExecuteQuery(sql)
    }


    async function ExecuteQuery(sql){
        return await database.query(sql)
    }

}

module.exports=MakeAuthList
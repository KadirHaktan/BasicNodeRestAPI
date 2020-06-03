function MakeUserContactsList({database}){
    return Object.freeze({
        GetUserContacts,
        AddContactForUser,
        GetContactIDByName,
        GetUserContactsById
    })



    async function GetUserContacts(id){
        const sql=`SELECT c.firstName as ContactName,c.lastName as LastName, c.emailAddress as Email FROM usercontact uc
        INNER JOIN user u 
        ON uc.user_id=u.id
        INNER JOIN contact c 
        ON uc.contact_id=c.id
        WHERE u.id=${id}`

        return ExecuteQuery(sql)
    }

    async function GetUserContactsById(userId,contactId){
        const sql=`SELECT c.firstName as ContactName,c.lastName as LastName, c.emailAddress as Email FROM usercontact uc
        INNER JOIN user u 
        ON uc.user_id=u.id
        INNER JOIN contact c 
        ON uc.contact_id=c.id
        WHERE u.id=${userId} AND c.id=${contactId}`

        return ExecuteQuery(sql)
    }


    async function GetContactIDByName(name){
        const sql=`SELECT contact.id FROM contact WHERE contact.firstName='${name}'`
        console.log(sql)
        return ExecuteQuery(sql)
       
    }

    async function AddContactForUser(userId,contactId){
        const sql=`INSERT INTO usercontact (user_id,contact_id) VALUES(${userId},${contactId})`
        const result=ExecuteQuery(sql)
        return result
    }


    async function ExecuteQuery(sql){
        return await database.query(sql)
    }

}

module.exports=MakeUserContactsList
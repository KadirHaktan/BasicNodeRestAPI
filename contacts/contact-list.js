
 function MakeContactList({database}){
    return Object.freeze({
        addWithQuery,
        getItemsQuery,
        RemoveQuery,
        UpdateQuery,
        findByIdQuery,
        findByEmailQuery,
        add,
        getItems
    })

    //#region  MySql

    async function getItemsQuery(){      
        return ExecuteQuery("SELECT * FROM contact")
            
    }

    async function addWithQuery({firstName,lastName,emailAddress}={}){
        const sql=`INSERT INTO contact(firstName,lastName,emailAddress) VALUES('${firstName}','${lastName}','${emailAddress}')`
        await ExecuteQuery(sql)
    }

    async function RemoveQuery(id){
        const sql=`DELETE FROM contact WHERE contact.id=${id}`
        return  ExecuteQuery(sql)
    }

    async function UpdateQuery(id){
        const sql=`UPDATE contact SET contact.id=${id}`
        return  ExecuteQuery(sql)
    }

    async function findByIdQuery(id){
        const sql=`SELECT * FROM contact WHERE contact.id=${id}`
        return  ExecuteQuery(sql)
    }

    async function findByEmailQuery({emailAddress}={}){
        const sql=`SELECT * FROM contact WHERE contact.emailAddress=${emailAddress}`
        return ExecuteQuery(sql)
    }
    
    async function ExecuteQuery(sql){
        return await database.query(sql)
    }

    //#endregion


    async function add({firstName,lastName,email}={}){
        const db=await database
        return( await db.collection('contacts')
        .insertOne({firstName,lastName,email})) 
       
    }

    async function getItems(){
        const db=await database
        return (await db.collection('contacts').find().toArray())
    }
}

module.exports=MakeContactList
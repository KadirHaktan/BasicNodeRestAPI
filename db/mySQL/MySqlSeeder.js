
const con=require('./MySqlHelper')()



const CreateUserTable=async()=>{

    try{
    const createQuery=
    "CREATE TABLE User"+
    "(`id` int AUTO_INCREMENT PRIMARY KEY,"+
    "`userName` VARCHAR(255),"+
    "`email` VARCHAR(255),"+
    "`password` VARCHAR(500))"

    await con.query(createQuery)
    console.log("Table created...")
    process.exit()
    }

    catch(e){
        console.log(e)
    }
}

const CreateUserContactTable=async()=>{
    try{
        const createQuery=
        "CREATE TABLE UserContact"+
        "(`id` int AUTO_INCREMENT PRIMARY KEY,"+
        "`user_id` int,"+
        "`contact_id` int,"+
        "INDEX (`user_id`,`contact_id`),"+
        "FOREIGN KEY (`user_id`) REFERENCES user(`id`),"+
        "FOREIGN KEY (`contact_id`) REFERENCES contact(`id`))"

    
        await con.query(createQuery)
        console.log("Table created...")
        process.exit()
        }
    
        catch(e){
            console.log(e)
        }
}


if(process.argv[2]==='-u'){
    CreateUserTable()
}

else if(process.argv[2]==='-uc'){
    CreateUserContactTable()
}


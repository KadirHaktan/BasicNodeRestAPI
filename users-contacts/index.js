const makeDb=require('../db/mySQL/MySqlHelper')
const MakeUserContactList=require('./user-contact-list')
const makeUserContactEndpointHandler=require('./user-contact-endpoint')


const database=makeDb()
const userContactList=MakeUserContactList({database})
const contactEndpointHandler=makeUserContactEndpointHandler({userContactList})

module.exports=contactEndpointHandler
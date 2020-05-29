
const makeDb=require('../db/mySQL/MySqlHelper')
const MakeContactList=require('./contact-list')
const makeContactEndpointHandler=require('./contact-endpoint')


const database=makeDb()
const contactList=MakeContactList({database})
const contactEndpointHandler=makeContactEndpointHandler({contactList})

module.exports=contactEndpointHandler
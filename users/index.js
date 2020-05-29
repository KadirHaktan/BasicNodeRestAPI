
const makeDb=require('../db/mySQL/MySqlHelper')
const MakeUserList=require('./user-list')
const {UserEndpointHandler}=require('./user-endpoint')


const database=makeDb()
const userList=MakeUserList({database})
const userEndpointHandler=UserEndpointHandler({userList})

module.exports=userEndpointHandler
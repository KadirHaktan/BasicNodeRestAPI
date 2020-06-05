
const makeDb=require('../db/mySQL/MySqlHelper')
const MakeUserList=require('./user-list')
const {UserEndpointHandler}=require('./user-endpoint')
const bcrypt=require('bcryptjs')


const database=makeDb()
const userList=MakeUserList({database})
const userEndpointHandler=UserEndpointHandler({userList,bcrypt})

module.exports=userEndpointHandler
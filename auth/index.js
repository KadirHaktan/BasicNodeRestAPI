const makeDb=require('../db/mySQL/MySqlHelper')
const MakeAuthList=require('./auth-list')
const {AuthEndpointHandler}=require('./auth-endpoint')


const database=makeDb()
const authList=MakeAuthList({database})
const authEndpointHandler=AuthEndpointHandler({authList})

module.exports={authEndpointHandler,authList}
const makeDb=require('../db/mySQL/MySqlHelper')
const MakeAuthList=require('./auth-list')
const {AuthEndpointHandler}=require('./auth-endpoint')

const jwt=require('jsonwebtoken')
const bcrypt=require('bcryptjs')


const database=makeDb()
const authList=MakeAuthList({database})
const authEndpointHandler=AuthEndpointHandler({authList,jwt,bcrypt})

module.exports={authEndpointHandler,authList}
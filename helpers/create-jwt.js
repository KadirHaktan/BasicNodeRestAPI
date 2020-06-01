

const jwt=require('jsonwebtoken')

const {JWT_EXPIRE,JWT_SECRET_KEY}=require('../config/config')

function CreateJWT(...infos){
    return jwt.sign({...infos},JWT_SECRET_KEY,{
        expiresIn:JWT_EXPIRE
    })
}

module.exports=CreateJWT
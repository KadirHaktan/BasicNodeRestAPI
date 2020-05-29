

const jwt=require('jsonwebtoken')

function CreateJWT(...infos){
    return jwt.sign({...infos},process.env.JWT_SECRET_KEY,{
        expiresIn:"60d"
    })
}

module.exports=CreateJWT

const jwt=require('jsonwebtoken')

const {UnauthorizedError}=require('./error')
const {authList}=require('../auth/index')
const {ResponseHandler}=require('./try-catch-handler')


    
function DecodeToken(fn){

    const Function=ResponseHandler(async(httpRequest,httpResponse,...otherParameters)=>{
        let token
        if(httpRequest.headers.authorization && httpRequest.headers.authorization.startsWith('Bearer')){
            token=httpRequest.headers.authorization.split(' ')[1]
        }
    
        if(!token){          
           throw new UnauthorizedError('Not authorized to access')         
        }
    
        try{    
            const decoded=jwt.verify(token,process.env.JWT_SECRET_KEY)
            const Id=decoded['0'].user[0].id

            httpRequest.user=await authList.findById(Id).then((data)=>{
                return data[0]
            })

            return fn(httpRequest,httpResponse,...otherParameters)

            
            
        }catch(e){
           throw new UnauthorizedError(`Not authorized to access=>${e.message}`)
        }
    })

    return Function
      
}






module.exports=DecodeToken
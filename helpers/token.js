

const {UnauthorizedError}=require('./error')
const {authList}=require('../auth/index')
const {ResponseHandler}=require('./try-catch-handler')
const  {JWT_SECRET_KEY}=require('../config/config')



    
 function VerifyToken(fn,jwt){

    const Function= ResponseHandler(async(httpRequest,httpResponse,...otherParameters)=>{
        let token
        if(httpRequest.headers.authorization && httpRequest.headers.authorization.startsWith('Bearer')){
            token=httpRequest.headers.authorization.split(' ')[1]
        }
    
        if(!token){          
           throw new UnauthorizedError('Not authorized to access')         
        }
        try{ 
            const decoded=jwt.verify(token,JWT_SECRET_KEY)
            const {id}=decoded.user
            httpRequest.user=await authList.findById(id).then((data)=>{
                return data[0]
            })

            return fn(httpRequest,httpResponse,...otherParameters)
      
        }catch(e){
         
           throw new UnauthorizedError(`Not authorized to access=>${e.message}`)
        }
    })

    return Function
      
}









module.exports={VerifyToken}

const MakeUser = require('./user')
const HashingProperty=require('../helpers/hashing-property')
const makeHttpError=require('../helpers/make-http-error')

function UserEndpointHandler({userList}) {

    return async function handler(httpRequest){
        switch (httpRequest.method){
            case 'POST':
                return Register(httpRequest)  
                
            default:
                return makeHttpError({
                    statusCode:503,
                    ErrorMessage:'Method not allowed'
                })
        }
    }


    async function Register(httpRequest){

        let {userName,password,email}=MakeUser(httpRequest.body).normalizeUser

        password=await HashingProperty(password)

        await userList.AddUser({userName,email,password})

        return {
            headers:{
                'Content-Type':'application/json'
            },
            statusCode:200,
            data:{
                userName,
                email,
                password
            }
        }

    }


}

module.exports={UserEndpointHandler}
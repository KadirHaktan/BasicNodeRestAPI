const makeHttpError = require('../helpers/make-http-error')
const {MakeLogin,MakeLoginUser} = require('./auth')
const CreateToken = require('../helpers/create-jwt')

const {JWT_COOKIE_EXPIRE}=require('../config/config')

function AuthEndpointHandler({authList,jwt,bcrypt}) {

    return async function handler(httpRequest){
        switch (httpRequest.method){
            case 'POST':
                return Login(httpRequest)

            case 'GET':
                return GetMe(httpRequest)

            case 'DELETE':
                return LogOut(httpRequest)
        }
    }

    async function Login(httpRequest) {
        const loginInfo = httpRequest.body

        const {email,password} = MakeLogin(loginInfo).validateLogin

        if (!email || !password) {
            return makeHttpError({
                statusCode: 404,
                ErrorMessage: 'Email or password can not be found'
            })
        }

        let user = await authList.findByUserEmailQuery(email)    
        user=user[0]   
        
        const validUser= await MakeLoginUser(user,password,bcrypt).validateUser
        const {id,userName}=validUser.user

        return SendTokenResponse({id,userName},httpRequest)
    }

    async function LogOut(httpRequest){

        const options={
            expires:new Date(Date.now()+10*100),
            httpOnly:true

        }


        return{
            headers:{
                'Content-Type':'application/json'
            },
            statusCode:200,
            name:'t',
            value:'none',
            options,
            data:JSON.stringify({}),
            success:true

        }
    }


    async function GetMe(httpRequest){

        let {user}=httpRequest  
        const User=await authList.findById(user.id)

        return{
            headers:{
                'Content-Type':'application/json',       
            },
            statusCode:200,
            success:true,
            data:JSON.stringify({
                User
            })
                   
        }
    }



    function SendTokenResponse(user,httpRequest){
        const token = CreateToken({jwt,user})

        console.log(token)

        const options = {
            expires: new Date(Date.now() +JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
            httpOnly: true
        }

        return {
            headers: {
                'Content-Type': 'application/json'
            },
            statusCode:200,
            name: 't',
            value: token,
            options,
            data:JSON.stringify({token}),
            success:true
        }
    }
}

module.exports={AuthEndpointHandler}
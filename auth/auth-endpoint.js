const makeHttpError = require('../helpers/make-http-error')
const {MakeLogin,MakeLoginUser} = require('./auth')
const CreateToken = require('../helpers/create-jwt')

function AuthEndpointHandler({authList}) {

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

        const user = await authList.findByUserEmailQuery(email)

        const validUser = await MakeLoginUser(user[0], password).validateUser

        return SendTokenResponse(validUser,httpRequest)
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
            value:none,
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
        const token = CreateToken(user)

        console.log(token)

        const options = {
            expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
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
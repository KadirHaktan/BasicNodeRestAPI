const { InvalidPropertyError}=require('../helpers/error')

const requireParam=require('../helpers/require-param')
const IsValidEmail=require('../helpers/is-valid-email')
const IsValidPassword=require('../helpers/is-valid-password')
const UpperFirst=require('../helpers/upper-first')


 function MakeUser(userInfo=requireParam('userInfo'))
{
    const validateUser=validate(userInfo)
    const normalizeUser=normalize(validateUser)

    return Object.freeze({normalizeUser})

    function validate({userName=requireParam('userName')
    ,password=requireParam('password')
    ,email=requireParam('email')
    ,...otherInfo}={}){
        validateName('userName',userName)
        validateEmail(email)
        validatePassword(password)

        return {userName,password,email,...otherInfo}
    }

    function validateName(label,name){
        if(name.length<3){
            throw new InvalidPropertyError(`A contact's ${label} must be at least 3 characters`)
        }

    }

    function validateEmail(email){
        if(!IsValidEmail(email)){
            throw new InvalidPropertyError('Invalid contact email address')
        }
        
    }

    function validatePassword(password){
        if(!IsValidPassword(password)){
            throw new InvalidPropertyError('Invalid formatting for password')
        }
    }

    function normalize({userName,email,password,...otherInfo}){
        return{
            
            userName:UpperFirst(userName),
            email:email.toLowerCase(),
            password,
            ...otherInfo
        }
    }

}

module.exports=MakeUser
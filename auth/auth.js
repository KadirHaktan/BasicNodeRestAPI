
const {
    InvalidPropertyError
} = require('../helpers/error')

const requireParam = require('../helpers/require-param')
const IsValidEmail = require('../helpers/is-valid-email')

const MatchingHashProperty=require('../helpers/matching-hash-property')





function MakeLogin(loginInfo = requireParam('loginInfo')) {
    const validateLogin = validate(loginInfo)

    return Object.freeze({
        validateLogin
    })

    function validate({email = requireParam('email'),password=requireParam('password'),...otherInfo} = {}){
        validateEmail(email)

        return {
            email,
            password,
            ...otherInfo
        }
    }

    function validateEmail(email) {
        if (!IsValidEmail(email)) {
            throw new InvalidPropertyError('Invalid contact email address')
        }
    }

  
}

function MakeLoginUser(user=requireParam('user'),password){

    const validateUser=validate(user)

    return Object.freeze({validateUser})
    
    function validate(user){
        ValidUser(user)
        IsMatchPassword(MatchingHashProperty,user,password)
        return {user}
        function ValidUser(user){
            if(!user){
                throw new InvalidPropertyError('Invalid Credentials')
            }
            

        }

        function IsMatchPassword(IsMatch,user,password){
            if(!IsMatch(user.password,password)){
                throw new InvalidPropertyError('Invalid Password')
            }
        }
    }
}

module.exports={MakeLogin,MakeLoginUser}
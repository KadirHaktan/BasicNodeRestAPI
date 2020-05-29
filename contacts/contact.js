const { InvalidPropertyError}=require('../helpers/error')

const requireParam=require('../helpers/require-param')
const IsValidEmail=require('../helpers/is-valid-email')
const UpperFirst=require('../helpers/upper-first')


 function MakeContact(contactInfo=requireParam('contactInfo'))
{
    const validateContact=validate(contactInfo)
    const normalizeContact=normalize(validateContact)

    return Object.freeze({normalizeContact})

    function validate({firstName=requireParam('firstName')
    ,lastName=requireParam('lastName')
    ,emailAddress=requireParam('emailAddress')
    ,...otherInfo}={}){
        validateName('first',firstName)
        validateName('last',lastName)
        validateEmail(emailAddress)

        return {firstName,lastName,emailAddress,...otherInfo}
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

    function normalize({emailAddress,firstName,lastName,...otherInfo}){
        return{
            ...otherInfo,
            firstName:UpperFirst(firstName),
            lastName:UpperFirst(lastName),
            emailAddress:emailAddress.toLowerCase()
        }
    }

}

module.exports=MakeContact
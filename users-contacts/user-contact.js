
const requireParam=require('../helpers/require-param')

const {NotFoundError,InvalidPropertyError}=require('../helpers/error')


function MakeUsersContactID(usersContactIDinfo=requireParam('usersContactIDinfo'))
{
    const validateUserContact=validate(usersContactIDinfo)
    

    return Object.freeze({validateUserContact})

    function validate({contactId=requireParam('contactId')
    ,...otherInfo}={}){
        NullControlToContactId(contactId)

        return {contactId,...otherInfo}
    }

    function NullControlToContactId(contactId){
        if(!contactId){
            throw new NotFoundError("That contact could not find")
        }
    }

}

function MakeUsersContactInfo(userContactinfo=requireParam('userContactinfo'))
{
    const validateUserContact=validate(userContactinfo)
    

    return Object.freeze({validateUserContact})

    function validate({firstName=requireParam('firstName')
    ,...otherInfo}={}){
        validateName("firstName",firstName)

        return {firstName,...otherInfo}
    }

    function validateName(label,name){
        if(!name){
            throw new InvalidPropertyError(label)
        }
    }

}

module.exports={MakeUsersContactID,MakeUsersContactInfo}
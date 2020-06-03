const requireParam = require('../helpers/require-param')

const {InvalidPropertyError} = require('../helpers/error')


function MakeUsersContactInfo({firstName = requireParam('firstName'),...otherInfo}) {
    const validateUserContact = validate()

    return Object.freeze({
        validateUserContact
    })

    function validate() {
        validateName("firstName", firstName)
        return {
            firstName,...otherInfo}
    }

    function validateName(label, name) {
        if (!name) {
            throw new InvalidPropertyError(`Invalid ${label}`)
        }
    }

}

module.exports = {
    MakeUsersContactInfo
}
const makeHttpError = require('../helpers/make-http-error')
const {MakeUsersContactInfo} = require('./user-contact')



function UserContactEndpointHandler({
    userContactList
}) {
    return async function handle(httpRequest) {
        switch (httpRequest.method) {
            case 'GET':
                return GetUserContects(httpRequest)

                case 'POST':
                     return PostUserContect(httpRequest)

            default:
                return makeHttpError({
                    statusCode: 503,
                    ErrorMessage: 'Method Not Allowed'
                })
        }
    }

    async function GetUserContects(httpRequest) {
        const {
            id
        } = httpRequest.user

        const {
            contactId
        } = httpRequest.pathParams || {}

        const results = contactId ? await userContactList.GetUserContactsById(id, contactId) :
            await userContactList.GetUserContacts(id)
        return {
            headers: {
                'Content-Type': 'application/json'
            },
            statusCode: 200,
            data: JSON.stringify({
                data: results
            })
        }
    }

    async function PostUserContect(httpRequest) {

        const {id,userName} = httpRequest.user

        const {firstName} = MakeUsersContactInfo(httpRequest.body).validateUserContact

        const contactIdResult = await userContactList.GetContactIDByName(firstName)
        const contactId=contactIdResult[0].id
        

        await userContactList.AddContactForUser(id,contactId)

        return {
            headers: {
                'Content-Type': 'application/json'
            },
            statusCode: 200,
            data: JSON.stringify({
                data: {
                    contactFirstName: firstName,
                    userName
                }
            })
        }
    }

}

module.exports = UserContactEndpointHandler

const makeHttpError = require('../helpers/make-http-error')
const {MakeUsersContactID,MakeUsersContactInfo} = require('./user-contact')



function UserContactEndpointHandler({
    usercontactList
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
        const {id} = httpRequest.user

        const {contactId}=httpRequest.pathParams||{}
    
        const results = contactId? await usercontactList.GetUserContactsById(id,contactId):
        await usercontactList.GetUserContacts(id)
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

        const contact = httpRequest.body
        const user=httpRequest.user
        const {firstName} =MakeUsersContactInfo(contact).validateUserContact
        const {id}=MakeUsersContactID(user).validateUserContact

        const contactId=await usercontactList.GetContactIDByName(firstName)

        await usercontactList.AddContactForUser(id,contactId)

        return {
            headers: {
                'Content-Type': 'application/json'
            },
            statusCode: 200,
            data: JSON.stringify({
                data: {
                    userName:user.userName,
                    contactFirstName:firstName,      
                }
            })
        }
    }

}

module.exports = UserContactEndpointHandler
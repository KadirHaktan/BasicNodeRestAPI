
const makeHttpError = require('../helpers/make-http-error')
const makeContact = require('./contact')
const {TrycatchHandler} = require('../helpers/try-catch-handler')


function ContactEndpointHandler({
    contactList
}) {
    return async function handle(httpRequest) {
        switch (httpRequest.method) {
            case 'GET':
                return GetContects(httpRequest)

            case 'POST':
                return PostContect(httpRequest)

            default:
                return makeHttpError({
                    statusCode: 503,
                    ErrorMessage: 'Method Not Allowed'
                })
        }
    }

    async function GetContects(httpRequest) {
        const {id} = httpRequest.pathParams || {}
        const results = id ? await contactList.findByIdQuery(id) : await contactList.getItemsQuery()
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

    async function PostContect(httpRequest) {

        const contact = httpRequest.body
        const {firstName,lastName,emailAddress} = makeContact(contact).normalizeContact

        await contactList.addWithQuery({firstName,lastName,emailAddress})

        return {
            headers: {
                'Content-Type': 'application/json'
            },
            statusCode: 200,
            data: JSON.stringify({
                data: {
                    firstName,
                    lastName,
                    emailAddress
                }
            })
        }
    }

}

module.exports = ContactEndpointHandler
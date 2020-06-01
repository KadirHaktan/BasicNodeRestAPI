
const makeHttpError=require('./make-http-error')

const {InvalidPropertyError,UniqueConstraintError,RequiredParameterError,UnauthorizedError,NotFoundError}=require('./error')

//#region Maybe ı will need this function again but now on ı don't need that function
// const TrycatchHandler=(fn,httpRequest,...otherParameters)=>{
//     return Promise.resolve(fn(httpRequest,...otherParameters)).catch((e)=>{
//         return makeHttpError({
//             ErrorMessage:e.message,
//             statusCode:e instanceof UniqueConstraintError?409
//             : e instanceof InvalidPropertyError || e instanceof RequiredParameterError?400:500
//         })

      
//     })
// }

//#endregion

const ResponseHandler=fn=>(req,res,...otherParameters)=>{
    return Promise.resolve(fn(req,res,...otherParameters)).catch((e)=>{
         const httpError=makeHttpError({
            ErrorMessage:e.message,
            statusCode:e instanceof UniqueConstraintError?409
            : e instanceof InvalidPropertyError || e instanceof RequiredParameterError?400:500 || e instanceof UnauthorizedError?e.statusCode:401
            || e instanceof NotFoundError? e.statusCode:404
        })

        res.status(httpError.statusCode).send(JSON.parse(httpError.data))
         
    })
}


module.exports={ResponseHandler}
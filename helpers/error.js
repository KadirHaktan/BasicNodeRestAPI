

class UniqueConstraintError extends Error{
    constructor(value){
        super(`${value} must be unique`)

        if(Error.captureStackTrace){
            Error.captureStackTrace(this,UniqueConstraintError)
        }
    }

   
}
class InvalidPropertyError extends Error{
    constructor(msg){
        super(msg)

        if(Error.captureStackTrace){
            Error.captureStackTrace(this,InvalidPropertyError)
        }
    }
}

class RequiredParameterError extends Error{
    constructor(param){
        super(`${param} can not be null or undefined`)

        if(Error.captureStackTrace){
            Error.captureStackTrace(this,RequiredParameterError)
        }
    }
}

class UnauthorizedError extends Error{
    constructor(message,statusCode=401){
        super(message)

        this.statusCode=statusCode

        if(Error.captureStackTrace){
            Error.captureStackTrace(this,UnauthorizedError)
        }

    }   
}

class NotFoundError extends Error{
    constructor(message,statusCode=404){
        super(message)
        this.statusCode=statusCode

        if(Error.captureStackTrace){
            Error.captureStackTrace(this,NotFoundError)
        }
    }
}



module.exports={RequiredParameterError,InvalidPropertyError,UniqueConstraintError,UnauthorizedError,NotFoundError}

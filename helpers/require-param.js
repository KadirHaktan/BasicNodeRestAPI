

const {RequiredParameterError}=require('./error')

function requireParam(param){
    throw new RequiredParameterError(param)
}

module.exports=requireParam
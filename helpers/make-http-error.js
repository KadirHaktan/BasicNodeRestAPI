 function MakeHttpError({statusCode,ErrorMessage}){
    return{
        headers:{
            'Content-Type':'application/json'
        },
        statusCode,
        data:JSON.stringify({
            success:false,
            error:ErrorMessage
        })
    }
}

module.exports=MakeHttpError
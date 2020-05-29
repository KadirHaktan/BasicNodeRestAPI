
 function IsValidEmail(email){
    const validate=new RegExp(/^[^@\s]+@[^@\s]+\.[^@\s]+$/)
    return validate.test(email)
}

module.exports=IsValidEmail
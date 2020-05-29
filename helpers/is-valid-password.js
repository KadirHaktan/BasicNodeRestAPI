function IsValidPassword(password){
    const validate=new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])")
    return validate.test(password)
}

module.exports=IsValidPassword
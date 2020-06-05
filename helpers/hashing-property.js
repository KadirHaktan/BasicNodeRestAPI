

//const bcrypt=require('bcryptjs')

async function HashingProperty(bcrypt,property){

    const salt=await bcrypt.genSalt(10)
    property=await bcrypt.hash(property,salt)

    return property
}

module.exports=HashingProperty
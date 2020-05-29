

const bcrypt=require('bcryptjs')

async function MatchHashProperty(p1,p2){
    return await bcrypt.compare(p2,p1).catch(err=>{throw err})
}

module.exports=MatchHashProperty
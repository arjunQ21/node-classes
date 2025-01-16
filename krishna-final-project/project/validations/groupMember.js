import joi from 'joi'


export default{
    addGroupMember:{
        body: joi.object().keys({
            userId:joi.string().length(24).required(),
           
        })
    }
}



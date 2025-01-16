import joi from 'joi'


export default{
    addGroup:{
        body: joi.object().keys({
            name:joi.string().min(3).required(),
            description:joi.string().min(3).required(),
            creatorID:joi.string().length(24).required(),
            isPrivate:joi.boolean()
        })
    }
}

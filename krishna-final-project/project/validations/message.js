import joi from 'joi'


export default{
    sendMessage:{
        body: joi.object().keys({
        //  file:joi.string().required(),
            content:joi.string().required(),
        }),
        // file:joi.object().keys({
        //     file:joi.string()
        // })
    }
}

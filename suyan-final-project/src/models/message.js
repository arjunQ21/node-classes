
import { model, Schema } from "mongoose";

const messageSchema = new Schema ({
  groupId:{
       type: String,
       required: true
  },
  senderId:{
    type: String,
    required: true
  },
  content:{
    type: String,
    required: true
  }
}, { timestamps: true })




const Message = model( "message", messageSchema);

export default Message;
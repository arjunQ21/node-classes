import { model, Schema } from "mongoose";

const MessageSchema = new Schema(
  {
    sender:{
        type: Schema.Types.ObjectId,  // Make sure this is an ObjectId
        ref: 'User',  // Reference the User model
        required: true
    },
    groupId:{
        type: Schema.Types.ObjectId,  // Make sure this is an ObjectId
        ref: 'Group',  // Reference the User model
        required: true
    },
    content:{
        type:String,
        required:true
    },
    file:{
        type:String,
        required:false
    }
  },
  {
    timestamps: true
  }
);

const Message= model("Message", MessageSchema);

export default Message;

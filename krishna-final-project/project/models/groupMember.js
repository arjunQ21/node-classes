const { date } = require("joi");
const { model, Schema } = require("mongoose");

const GroupMemberSchema = new Schema(
  {
    userId:{
        type: Schema.Types.ObjectId,  // Make sure this is an ObjectId
        ref: 'User',  // Reference the User model
        required: true
    },
    groupId:{
        type: Schema.Types.ObjectId,  // Make sure this is an ObjectId
        ref: 'Group',  // Reference the User model
        required: true
    },
    joinDate:{
        type: Date,
        default: Date.now
    },
    seenMessageID:{
        type:String,
        default:null
    }
  },
  {
    timestamps: true
  }
);

const GroupMember= model("GroupMember", GroupMemberSchema);

export default GroupMember;

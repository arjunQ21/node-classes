const { date } = require("joi");
const { model, Schema } = require("mongoose");

const GroupSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    creatorID:{ 
        type: Schema.Types.ObjectId,  // Make sure this is an ObjectId
        ref: 'User',  // Reference the User model
        required: true
    },
    isPrivate:{
        type:Boolean,
        default:true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
},{
    timestamps:true
});

const Group =model("Group",GroupSchema);

export default Group;


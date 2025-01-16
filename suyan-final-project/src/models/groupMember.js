import { model, Schema } from "mongoose"


const membersSchema = new Schema({

userId:{
     type: String,
},
groupId:{
  type: String,
},

joinDate:{
  type: Date
},
seenMessageID:{
  type: String
}
})


const groupMember = model("groupMember",membersSchema );
export default groupMember;

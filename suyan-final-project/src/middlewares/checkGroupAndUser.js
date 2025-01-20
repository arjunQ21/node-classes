// import { catchAsync } from "../helpers/catchAsync.js";
// import Group from "../models/group.js";
// import groupMember from "../models/groupMember";


// const checkGroupAndUser= catchAsync (async(req,res,next)=>{
//   const groupId = req.params.groupId; // groupId

//   const group = await Group.findOne({_id: groupId})
//   if(!group){
//     throw new Error("Not found any group with given groupID")
//   }

//   const currentId= req.user._id.toString()
//   if (currentId != groupMember.userId || currentId != group.creatorID) {
//     throw new Error("User ID is missing. Are you authenticated?");
//   }
// next()
  
// })
// export default checkGroupAndUser
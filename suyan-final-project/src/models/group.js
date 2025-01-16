import { model, Schema } from "mongoose";

const groupSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    creatorID: {
      type: Schema.Types.ObjectId, // Assuming it references another model
      
      ref: "User", // Reference to the User model (adjust as needed)
    },
    isPrivate: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

const Group = model("Group", groupSchema);

export default Group;

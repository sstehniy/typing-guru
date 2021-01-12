import mongoose, { Document } from "mongoose";
import validator from "mongoose-unique-validator";

export interface IUser extends Document {
  fullName: string;
  email: string;
  username: string;
  passwordHash: string;
  tests: any[];
}

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  tests: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "test",
    },
  ],
});

userSchema.set("toJSON", {
  transform: (pre: IUser, ret: IUser) => {
    ret.id = pre._id; //eslint-disable-line
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

userSchema.plugin(validator);

const User = mongoose.model<IUser>("user", userSchema);

export default User;

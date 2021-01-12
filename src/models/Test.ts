import mongoose, { Schema, Document } from "mongoose";

export interface ITest extends Document {
  wpm: number;
  cpm: number;
  acc: number;
  score: number;
}

const testSchema = new Schema(
  {
    wpm: {
      type: Number,
      required: true,
    },
    cpm: {
      type: Number,
      required: true,
    },
    acc: {
      type: Number,
      required: true,
    },
    score: {
      type: Number,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { timestamps: true }
);

testSchema.set("toJSON", {
  transform: (pre: ITest, ret: ITest) => {
    ret.id = pre._id; // eslint-disable-line
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

const Test = mongoose.model<ITest>("test", testSchema);

export default Test;

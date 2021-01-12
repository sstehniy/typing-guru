"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_unique_validator_1 = __importDefault(require("mongoose-unique-validator"));
const userSchema = new mongoose_1.default.Schema({
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
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "test",
        },
    ],
});
userSchema.set("toJSON", {
    transform: (pre, ret) => {
        ret.id = pre._id; //eslint-disable-line
        delete ret._id;
        delete ret.__v;
        return ret;
    },
});
userSchema.plugin(mongoose_unique_validator_1.default);
const User = mongoose_1.default.model("user", userSchema);
exports.default = User;
//# sourceMappingURL=User.js.map
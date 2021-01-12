"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const testSchema = new mongoose_1.Schema({
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
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
}, { timestamps: true });
testSchema.set("toJSON", {
    transform: (pre, ret) => {
        ret.id = pre._id; // eslint-disable-line
        delete ret._id;
        delete ret.__v;
        return ret;
    },
});
const Test = mongoose_1.default.model("test", testSchema);
exports.default = Test;
//# sourceMappingURL=Test.js.map
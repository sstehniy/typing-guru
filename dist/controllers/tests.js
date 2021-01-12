"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const Test_1 = __importDefault(require("../models/Test"));
const User_1 = __importDefault(require("../models/User"));
const getTokenFromRequest_1 = __importDefault(require("../utils/getTokenFromRequest"));
router.use(getTokenFromRequest_1.default);
router.get("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allTests = yield Test_1.default.find({}, { updatedAt: 0 }).populate("user", "username");
        res.status(200).json(allTests.map(t => t.toJSON())); //eslint-disable-line
    }
    catch (error) {
        next({ status: 500, message: "Failed to fetch the resource" });
    }
}));
router.post("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { data, decodedToken } = req.body;
    const { wpm, cpm, acc, score, username } = data;
    if (!username || username !== decodedToken.username)
        return next({ status: 401, message: "Token malformed" });
    try {
        const user = yield User_1.default.findById(decodedToken.id);
        const newTest = new Test_1.default({
            wpm,
            cpm,
            acc,
            score,
            user: user._id,
        });
        const savedTest = yield newTest.save();
        user.tests = user.tests.concat(savedTest._id); //eslint-disable-line
        yield user.save();
        res.status(201).json(savedTest.toJSON());
    }
    catch (error) {
        return next({
            status: 409,
            message: "Failed to create resource",
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            data: error,
        });
    }
}));
router.get("/user/:userId", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    const { decodedToken } = req.body;
    if (userId !== decodedToken.id)
        return next({ status: 401, message: "Token malformed" });
    try {
        const allTests = yield Test_1.default.find({ user: decodedToken.id }, { updatedAt: 0 }).populate("user", "username");
        res.status(200).json(allTests.map(t => t.toJSON())); // eslint-disable-line
    }
    catch (error) {
        next({ status: 500, message: "Failed to fetch the resource" });
    }
}));
exports.default = router;
//# sourceMappingURL=tests.js.map
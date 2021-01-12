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
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
router.post("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { data: creds } = req.body;
    const { username, email, password } = creds;
    let chosenFirstCred;
    if (!username && email)
        chosenFirstCred = { field: "email", value: email };
    else if (username && !email)
        chosenFirstCred = { field: "username", value: username };
    const dbUser = yield User_1.default.findOne({
        [chosenFirstCred.field]: chosenFirstCred.value,
    });
    try {
        const passwordCorrect = !!dbUser && (yield bcrypt_1.default.compare(password, dbUser.passwordHash));
        if (!passwordCorrect)
            return next({
                status: 401,
                message: "Invalid credentials, failed to authenticate",
            });
    }
    catch (error) {
        console.log("errrrorrrr");
    }
    const userForToken = {
        username: dbUser.username,
        id: dbUser._id,
    };
    const token = jsonwebtoken_1.default.sign(userForToken, process.env.TOKEN_SECRET);
    res.status(200).json({
        token,
        username: dbUser.username,
        fullName: dbUser.fullName,
        email: dbUser.email,
        id: dbUser._id,
    });
}));
exports.default = router;
//# sourceMappingURL=login.js.map
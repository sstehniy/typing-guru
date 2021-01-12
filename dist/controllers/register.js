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
/* eslint-disable @typescript-eslint/ban-ts-comment */
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const bcrypt_1 = __importDefault(require("bcrypt"));
const User_1 = __importDefault(require("../models/User"));
router.post("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    const { data: creds } = req.body;
    const { fullName, email, username, password } = creds;
    if (!fullName || !email || !username || !password) {
        const missingParams = Object.keys(creds)
            // @ts-ignore
            .map(key => (!creds[key] ? key : null))
            .filter(value => !!value);
        return next({
            status: 422,
            message: "Some required parameters are missing",
            data: missingParams,
        });
    }
    /*   const userExists = await User.find({ $or: [{ email }, { username }] });
    if (userExists.length) {
      return next({
        status: 409,
        message: 'Either email or username are already registered',
      });
    } */
    const SALT = yield bcrypt_1.default.genSalt(10);
    const passwordHash = yield bcrypt_1.default.hash(password, SALT);
    try {
        const newUser = new User_1.default({
            fullName,
            email,
            username,
            passwordHash,
        });
        const user = yield newUser.save();
        res.status(200).json(user);
    }
    catch (error) {
        next({ status: 409, message: "Registration error", data: error }); // eslint-disable-line
    }
}));
exports.default = router;
//# sourceMappingURL=register.js.map
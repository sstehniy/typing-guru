"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const getTokenFromRequest = (req) => {
    const auth = req.get("Authorization");
    console.log(auth);
    if (auth && auth.trim().startsWith("bearer"))
        return auth.substring(7);
    else
        return null;
};
const validateToken = (req, _res, next) => {
    const token = getTokenFromRequest(req);
    console.log(token);
    const decodedToken = token
        ? jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET)
        : null;
    if (!token || !decodedToken.id) {
        return next({ status: 403, message: "Token invalid or missing" });
    }
    else {
        req.body.decodedToken = decodedToken; //eslint-disable-line
        next();
    }
};
exports.default = validateToken;
//# sourceMappingURL=getTokenFromRequest.js.map
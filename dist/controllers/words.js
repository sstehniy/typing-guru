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
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
const express_1 = require("express");
const puppeteer_1 = __importDefault(require("puppeteer"));
const router = express_1.Router();
const url = "https://www.mit.edu/~ecprice/wordlist.10000";
router.get("/", (_req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const browser = yield puppeteer_1.default.launch({
            headless: true,
            args: ["--no-sandbox", "--disable-setuid-sandbox"],
        });
        const page = yield browser.newPage();
        yield page.goto(url);
        const wordsHtml = yield page.evaluate(() => {
            return document.querySelector("pre").innerHTML;
        });
        yield browser.close();
        const allWords = wordsHtml
            .split("\n")
            .filter(word => word.length > 5 && word.length < 13);
        const wordsArray = [];
        while (wordsArray.length <= 200) {
            wordsArray.push(allWords[Math.floor(Math.random() * allWords.length)]);
        }
        res.status(200).json(wordsArray);
    }
    catch (error) {
        console.log(error);
        next({ status: 500, message: "Failed to fetch the resource" });
    }
}));
exports.default = router;
//# sourceMappingURL=words.js.map
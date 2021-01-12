/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Router } from "express";
import puppeteer from "puppeteer";

const router = Router();

const url = "https://www.mit.edu/~ecprice/wordlist.10000";

router.get("/", async (_req, res, next) => {
  try {
    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    const page = await browser.newPage();
    await page.goto(url);
    const wordsHtml = await page.evaluate(() => {
      return document.querySelector("pre").innerHTML;
    });
    await browser.close();
    const allWords = wordsHtml
      .split("\n")
      .filter(word => word.length > 5 && word.length < 13);
    const wordsArray = [];
    while (wordsArray.length <= 200) {
      wordsArray.push(allWords[Math.floor(Math.random() * allWords.length)]);
    }
    res.status(200).json(wordsArray);
  } catch (error) {
    console.log(error);
    next({ status: 500, message: "Failed to fetch the resource" });
  }
});

export default router;

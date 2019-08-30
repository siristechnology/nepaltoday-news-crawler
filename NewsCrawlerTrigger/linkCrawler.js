const puppeteer = require("puppeteer");
const { newsPortalLink } = require("../constants/portal");
const { KANTIPUR, SETOPATI, RATOPATI, DAINIK_KHABAR } = newsPortalLink;

const scrapeNewsLink = (baseUrl, url) => {
  switch (baseUrl) {
    case SETOPATI:
      return scrapeSetoPatiLink(url);
    default:
      return null;
  }
};

const scrapeKantipurNewsLink = async url => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    const scrapedData = await page.evaluate(() =>
      Array.from(document.querySelectorAll("article > h1, h2 > a "))
        .slice(0, 1)
        .map(link => ({
          url: `https://ekantipur.com${link.getAttribute("href")}`
        }))
    );

    await browser.close();
    return scrapedData;
  } catch (error) {
    throw new Error(error);
  }
};
const scrapeSetoPatiLink = async url => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    const scrapedData = await page.evaluate(() =>
      Array.from(document.querySelectorAll(".big-feature > a, .items > a "))
        .slice(0, 1)
        .map(link => ({
          url: link.getAttribute("href")
        }))
    );

    await browser.close();
    return scrapedData;
  } catch (error) {
    throw new Error(error);
  }
};
const scrapeRatoPatiLink = async url => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    const scrapedData = await page.evaluate(() =>
      Array.from(document.querySelectorAll("article > h1, h2 > a "))
        .slice(0, 1)
        .map(link => ({
          url: `https://ratopati.com${link.getAttribute("href")}`
        }))
    );

    await browser.close();
    return scrapedData;
  } catch (error) {
    throw new Error(error);
  }
};

const scrapeDainikNepalLinks = async url => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    const scrapedData = await page.evaluate(() =>
      Array.from(document.querySelectorAll("article > h1, h2 > a "))
        .slice(0, 1)
        .map(link => ({
          url: `https://dainiknepal.com${link.getAttribute("href")}`
        }))
    );

    await browser.close();
    return scrapedData;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  scrapeNewsLink
};

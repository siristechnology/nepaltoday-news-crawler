const puppeteer = require("puppeteer");
const { newsPortalLink } = require("../constants/portal");
const { KANTIPUR, SETOPATI, RATOPATI, DAINIK_KHABAR } = newsPortalLink;

const scrapeNewsLink = link => {
  switch (link) {
    case KANTIPUR:
      return scrapeKantipurNewsLink();
    default:
      return null;
  }
};

const scrapeKantipurNewsLink = async () => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(KANTIPUR);

    const scrapedData = await page.evaluate(() =>
      Array.from(document.querySelectorAll("article > h1, h2 > a "))
        .slice(0, 10)
        .map(link => ({
          url: link.getAttribute("href")
        }))
    );

    await browser.close();
    return scrapedData;
  } catch (error) {
    await browser.close();
    throw new Error(error);
  }
};

module.exports = {
  scrapeNewsLink
};

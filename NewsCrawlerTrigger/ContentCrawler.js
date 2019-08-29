const Mercury = require("@postlight/mercury-parser");

const { getSegment } = require("./url");

const scrapeNewsContent = async link => {
  try {
    const scrappedNews = await Mercury.parse(link);
    const category = getSegment(link, 1);
    if (scrappedNews) {
      return {
        title: scrappedNews.title,
        shortDescription: scrappedNews.excerpt,
        content: null,
        link: scrappedNews.url || link,
        imageLink: scrappedNews.lead_image_url,
        publishedDate: scrappedNews.date_published,
        category
      };
    }
    return {};
  } catch (error) {
    return null;
  }
};

module.exports = {
  scrapeNewsContent
};

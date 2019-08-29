module.exports = async function(context, myTimer) {
  var timeStamp = new Date().toISOString();
  const { newsDbService } = require("nepaltoday-db-service");
  const { scrapeNewsLink } = require("./linkCrawler");
  const { scrapeNewsContent } = require("./ContentCrawler");

  const ipAddress = require("ip").address();

  if (myTimer.IsPastDue) {
    context.log("JavaScript is running late!");
  }

  /**
   * GETTTING ALL SOURCES
   */

  try {
    const sources = await newsDbService.getAllSources();
    if (sources) {
      sources.map(async source => {
        const sourceId = source._id;
        const newsLinks = await scrapeNewsLink(source.link);
        if (newsLinks) {
          newsLinks.map(async link => {
            const content = await scrapeNewsContent(`${link.url}`);
            if (content && content.title && sourceId) {
              content.source = sourceId;
              content.createdDate = new Date();
              content.modifiedDate = new Date();
              content.isHeadline = true; // TODO: check if h1 or h2
              content.hostIp = ipAddress;
              const savedArticle = await newsDbService.saveArticle(content);
              if (savedArticle) {
                context.log("article saved successfully!!!!");
              }
            }
          });
        }
      });
    }
  } catch (error) {
    context.error("error occured here", error);
  }

  context.log("JavaScript timer trigger function ran!", timeStamp);
};

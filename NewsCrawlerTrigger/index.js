module.exports = async function(context, myTimer) {
  var timeStamp = new Date().toISOString();
  const { newsDbService } = require("nepaltoday-db-service");
  const { scrapeNewsLink } = require("./linkCrawler");
  const { scrapeNewsContent } = require("./ContentCrawler");

  const ipAddress = require("ip").address();

  if (myTimer.IsPastDue) {
    context.log("JavaScript is running late!");
  }

  try {
    const sources = await newsDbService.getAllSources();
    if (sources) {
      sources.map(async source => {
        const sourceId = source._id;
        const baseUrl = source.link;
        const logoLink = source.logoLink;
        const categories = source.category;
        if (categories) {
          categories.map(async category => {
            const categoryName = category.name;
            const url = `${baseUrl}${category.path}`;
            const newsLinks = await scrapeNewsLink(baseUrl, url);
            if (Array.isArray(newsLinks) && newsLinks.length > 0) {
              //   console.log("news link", newsLinks);
              newsLinks.map(async link => {
                const content = await scrapeNewsContent(
                  `${link.url}`,
                  logoLink
                );
                if (content && content.title && sourceId) {
                  content.source = sourceId;
                  content.createdDate = new Date();
                  content.modifiedDate = new Date();
                  content.isHeadline = true; // TODO: check if h1 or h2
                  content.hostIp = ipAddress;
                  content.category = categoryName;
                  //   console.log("content", content);
                  const savedArticle = await newsDbService.saveArticle(content);
                  if (savedArticle) {
                    context.log("article saved successfully!!!!");
                  }
                }
              });
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

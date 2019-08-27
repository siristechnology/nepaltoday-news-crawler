const Mercury = require("@postlight/mercury-parser");

const url = "https://www.setopati.com/politics/188585";

Mercury.parse(url).then(result => console.log(result));

// NOTE: When used in the browser, you can omit the URL argument
// and simply run `Mercury.parse()` to parse the current page.

const selector = {
	kantipur: {
		TITLE: 'article .article-header > h1',
		EXCERPT: 'article .description > p',
		LEAD_IMAGE: {
			PATH: 'article.normal div.description div.image figure img',
			SELECTOR: 'data-src'
		},
		CONTENT: 'article.normal div.description'
	},
	ratopati: {
		TITLE: '.article-head > h1',
		EXCERPT: '.ratopati-table-border-layout p:first-child',
		LEAD_IMAGE: {
			PATH: '.img-with-no-margin img',
			SELECTOR: 'src'
		},
		CONTENT: '.ratopati-table-border-layout'
	}
}

module.exports = {
	selector
}

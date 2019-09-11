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
	},
	setopati: {
		TITLE: 'section.news-detail-section div.title-names span.news-big-title',
		EXCERPT: 'aside.left-side div.detail-box div.editor-box p:first-child',
		LEAD_IMAGE: {
			PATH: 'section.news-detail-section div.featured-images figure img',
			SELECTOR: 'src'
		},
		CONTENT: 'aside.left-side div.detail-box div.editor-box'
	},
	dainik: {
		TITLE: 'div#sing_left div#sing_cont h1.inside_head',
		EXCERPT: 'div#sing_left div#sing_cont div.content p:nth-child(2)',
		LEAD_IMAGE: {
			PATH: 'div#sing_left div#sing_cont div.content img',
			SELECTOR: 'src'
		},
		CONTENT: 'div#sing_left div#sing_cont div.content p'
	}
}

module.exports = {
	selector
}

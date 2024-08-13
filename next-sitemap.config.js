module.exports = {
    siteUrl: 'https://www.yejzila.com',
    generateRobotsTxt: true, // Generate robots.txt file
    changefreq: 'daily',
    priority: 0.7,
    sitemapSize: 5000,
    // Additional options:
    exclude: ['/admin/*', '/login'],
    robotsTxtOptions: {
        policies: [
            { userAgent: '*', allow: '/' },
            { userAgent: 'Googlebot', allow: '/', disallow: ['/admin'] },
        ],
        // additionalSitemaps: [
        //     'https://www.yejzila.com/my-custom-sitemap-1.xml',
        //     'https://www.yejzila.com/my-custom-sitemap-2.xml',
        // ],
    },
};

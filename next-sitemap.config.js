module.exports = {
    siteUrl: 'https://yejzila.com',
    generateRobotsTxt: true,
    changefreq: 'weekly',
    priority: 0.7,
    sitemapSize: 5000,
    exclude: ['/studio', '/studio/*', '/api/*'],
    robotsTxtOptions: {
        policies: [
            { userAgent: '*', allow: '/' },
            { userAgent: '*', disallow: ['/studio', '/api'] },
        ],
        additionalSitemaps: [
            'https://yejzila.com/sitemap.xml',
        ],
    },
};

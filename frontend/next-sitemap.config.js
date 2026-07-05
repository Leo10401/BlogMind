const fetch = require('node-fetch');

module.exports = {
  siteUrl: 'https://blog-mind.vercel.app',
  generateRobotsTxt: true,
  // Optionally exclude admin or other private routes
  // exclude: ['/admin/*'],
  additionalPaths: async (config) => {
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://your-backend-api-url';
    let paths = [];
    // Fetch blogs
    try {
      const blogsRes = await fetch(`${API_URL}/blog/getall`);
      if (blogsRes.ok) {
        const blogs = await blogsRes.json();
        paths = paths.concat(
          blogs.map(blog => ({
            loc: `/blog/${blog._id}`,
            lastmod: blog.updatedAt || blog.createdAt,
            changefreq: 'weekly',
            priority: 0.7,
          }))
        );
      }
    } catch (e) {
      // ignore errors
    }
    // Fetch competitions
    try {
      const compsRes = await fetch(`${API_URL}/comp/getall`);
      if (compsRes.ok) {
        const comps = await compsRes.json();
        paths = paths.concat(
          comps.map(comp => ({
            loc: `/viewcompetition/${comp._id}`,
            lastmod: comp.updatedAt || comp.createdAt,
            changefreq: 'monthly',
            priority: 0.8,
          }))
        );
      }
    } catch (e) {
      // ignore errors
    }
    // Add static pages (if not already included by default)
    const staticPages = [
      { loc: '/', changefreq: 'yearly', priority: 1 },
      { loc: '/authentication', changefreq: 'monthly', priority: 0.8 },
      { loc: '/competition', changefreq: 'monthly', priority: 0.8 },
      { loc: '/links', changefreq: 'yearly', priority: 0.5 },
      { loc: '/listblog', changefreq: 'weekly', priority: 0.9 },
      { loc: '/Rankers', changefreq: 'monthly', priority: 0.7 },
      { loc: '/Features', changefreq: 'yearly', priority: 0.6 },
    ];
    return [...staticPages, ...paths];
  },
}; 
import { createWriteStream, writeFileSync } from "fs";
import { SitemapStream } from "sitemap";
import fetch from "node-fetch";
import { resolve } from "path";
import dotenv from "dotenv";
dotenv.config();

const hostname = process.env.VITE_FRONTEND_URL;
const apiUrl = process.env.VITE_BACKEND_URL + "/api";

const sitemapStream = new SitemapStream({
  hostname: hostname,
});
const writeStream = createWriteStream("./public/sitemap.xml");

sitemapStream.pipe(writeStream).on("finish", () => {
  console.log("Sitemap generated!");
});

// Static URLs to include in the sitemap
const urls = [
  { url: "/", changefreq: "daily", priority: 1.0 },
  { url: "/about-us", changefreq: "weekly", priority: 0.8 },
  { url: "/contact-us", changefreq: "weekly", priority: 0.8 },
  { url: "/services", changefreq: "weekly", priority: 0.8 },
  { url: "/blogs", changefreq: "weekly", priority: 0.8 },
  { url: "/board-directors", changefreq: "weekly", priority: 0.8 },
];

// Add static URLs to the sitemap
urls.forEach((url) => sitemapStream.write(url));

// Function to fetch blog posts and add to sitemap
const addDynamicBlogRoutes = async () => {
  try {
    const response = await fetch(`${apiUrl}/blogs/all`);
    const blogs = await response.json();

    // Add each blog URL to the sitemap
    blogs?.data?.forEach((blog) => {
      sitemapStream.write({
        url: `/blogs/${blog?._id}`,
        changefreq: "weekly",
        priority: 0.8,
      });
    });
  } catch (error) {
    console.error("Error fetching blog posts:", error);
  }
};

// Function to generate robots.txt file
const generateRobotsTxt = () => {
  const robotsContent = `User-agent: *
Disallow: /admin
Sitemap: ${hostname}/sitemap.xml
`;

  // Write robots.txt file
  writeFileSync(resolve("./public/robots.txt"), robotsContent);
  console.log("robots.txt generated!");
};

// Generate the sitemap
const generateSitemap = async () => {
  await addDynamicBlogRoutes(); // Dynamic URLs যুক্ত করা
  sitemapStream.end(); // Sitemap শেষ করা
  generateRobotsTxt(); // Generate robots.txt
};

// Start the sitemap and robots.txt generation
generateSitemap();

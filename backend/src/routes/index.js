const router = require("express").Router();

//------------------------------------------------------------------------------
// import Routes
//------------------------------------------------------------------------------
const admin = require("./adminRoute");
const logo = require("./logoRoutes");
const favicon = require("./faviconRoutes");

const whoweare = require("./whoweareRoutes");
const about = require("./aboutRoutes");
const banner = require("./bannerRoutes");
const contact = require("./contactRoutes");
const businessInfo = require("./businessInfoRoutes");

const service = require("./serviceRoute");
const counter = require("./counterRoutes");
const blog = require("./blogRoutes");
const features = require("./featureRoutes");
const featureSection = require("./featureSectionRoutes");
const director = require("./directorRoutes");
const videoSection = require("./videoSectionRoutes");

const message = require("./messageRoutes");
const seo = require("./seoRoutes");

const portfolio = require("./portfolio/portfolioRoutes");
const classCategory = require("./portfolio/categoryRoutes");
const classes = require("./portfolio/classRoutes");
const product = require("./portfolio/productRoutes");

//------------------------------------------------------------------------------
// use Routes
//------------------------------------------------------------------------------
router.use("/admins", admin);
router.use("/logo", logo);
router.use("/favicon", favicon);

router.use("/banner", banner);
router.use("/about", about);
router.use("/whoweare", whoweare);
router.use("/contact", contact);
router.use("/businessInfo", businessInfo);

router.use("/services", service);
router.use("/counter", counter);
router.use("/blogs", blog);
router.use("/feature", features);
router.use("/featureSection", featureSection);
router.use("/director", director);
router.use("/videoSection", videoSection);

router.use("/message", message);
router.use("/seo", seo);

router.use("/portfolio", portfolio);
router.use("/portfolio/category", classCategory);
router.use("/portfolio/class", classes);
router.use("/portfolio/product", product);

module.exports = router;

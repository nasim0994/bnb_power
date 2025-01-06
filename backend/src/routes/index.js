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
const company = require("./companyRoutes");

const message = require("./messageRoutes");
const seo = require("./seoRoutes");

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
router.use("/company", company);

router.use("/message", message);
router.use("/seo", seo);

module.exports = router;

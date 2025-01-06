const router = require("express").Router();
const verifyAdmin = require("../../middleware/verifyAdmin");
const {
  add,
  update,
  get,
  destroy,
  getSingle,
  getBySlug,
} = require("../../controllers/portfolio/portfolioControllers");

router.get("/all", get);
router.post("/add", verifyAdmin, add);
router.get("/:id", getSingle);
router.get("/slug/:slug", getBySlug);
router.patch("/update/:id", verifyAdmin, update);
router.delete("/delete/:id", verifyAdmin, destroy);

module.exports = router;

const router = require("express").Router();
const verifyAdmin = require("../../middleware/verifyAdmin");
const {
  add,
  update,
  get,
  destroy,
  getSingle,
  getBySlug,
} = require("../../controllers/portfolio/categoryControllers");

router.get("/all", get);
router.post("/add", verifyAdmin, add);
router.get("/:id", verifyAdmin, getSingle);
router.get("/slug/:slug", verifyAdmin, getBySlug);
router.patch("/update/:id", verifyAdmin, update);
router.delete("/delete/:id", verifyAdmin, destroy);

module.exports = router;

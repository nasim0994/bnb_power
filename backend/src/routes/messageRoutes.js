const router = require("express").Router();
const verifyAdmin = require("../middleware/verifyAdmin");
const {
  getAll,
  add,
  destroy,
  getSingle,
} = require("../controllers/messageController");

router.get("/all", getAll);
router.post("/add", add);
router.get("/:id", getSingle);
router.delete("/delete/:id", verifyAdmin, destroy);

module.exports = router;

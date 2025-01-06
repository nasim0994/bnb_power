const router = require("express").Router();
const verifyAdmin = require("../middleware/verifyAdmin");
const { get, update, add } = require("../controllers/contactController");

router.get("/all", get);
router.post("/add", verifyAdmin, add);
router.patch("/update/:id", verifyAdmin, update);

module.exports = router;

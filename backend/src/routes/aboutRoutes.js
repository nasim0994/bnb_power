const router = require("express").Router();
const verifyAdmin = require("../middleware/verifyAdmin");
const {
  add,
  update,
  get,
  destroy,
  getSingle,
  getBySlug,
} = require("../controllers/aboutControllers");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/aboutus");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage: storage }).single("image");

router.get("/", get);
router.post("/add", verifyAdmin, upload, add);
router.get("/:id", verifyAdmin, getSingle);
router.get("/slug/:slug", verifyAdmin, getBySlug);
router.patch("/update/:id", verifyAdmin, upload, update);
router.delete("/delete/:id", verifyAdmin, destroy);

module.exports = router;

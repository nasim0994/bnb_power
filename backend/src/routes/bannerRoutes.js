const router = require("express").Router();
const multer = require("multer");
const verifyAdmin = require("../middleware/verifyAdmin");
const {
  add,
  getAll,
  destroy,
  getSingle,
  update,
} = require("../controllers/bannerController");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/banners");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage: storage }).single("image");

router.post("/add", verifyAdmin, upload, add);
router.get("/all", getAll);
router.get("/:id", getSingle);
router.patch("/update/:id", verifyAdmin, upload, update);
router.delete("/delete/:id", verifyAdmin, destroy);

module.exports = router;

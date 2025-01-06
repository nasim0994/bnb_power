const router = require("express").Router();
const multer = require("multer");
const verifyAdmin = require("../middleware/verifyAdmin");
const { get, add, update } = require("../controllers/faviconController");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/favicon");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage: storage });

router.get("/all", get);
router.post("/add", verifyAdmin, upload.single("icon"), add);
router.patch("/update/:id", verifyAdmin, upload.single("icon"), update);

module.exports = router;

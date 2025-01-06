const router = require("express").Router();
const verifyAdmin = require("../middleware/verifyAdmin");
const multer = require("multer");
const { get, add, update } = require("../controllers/logoController");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/logo");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage: storage });

router.get("/all", get);
router.post("/add", verifyAdmin, upload.single("logo"), add);
router.patch("/update/:id", verifyAdmin, upload.single("logo"), update);

module.exports = router;

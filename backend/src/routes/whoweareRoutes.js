const router = require("express").Router();
const multer = require("multer");
const { add, update, get } = require("../controllers/whoweareController");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/aboutus");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage: storage });

router.get("/", get);
router.post("/add", upload.single("image"), add);
router.patch("/update/:id", upload.single("image"), update);

module.exports = router;

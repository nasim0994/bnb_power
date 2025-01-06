const router = require("express").Router();
const multer = require("multer");
const verifyAdmin = require("../middleware/verifyAdmin");
const {
  get,
  add,
  update,
  addCount,
  updateCount,
  deleteCount,
} = require("../controllers/counterController");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let dest = "./uploads/counter";
    cb(null, dest);
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({
  storage: storage,
});

router.get("/get", get);
router.post("/add", verifyAdmin, upload.single("bgImage"), add);
router.post("/count/add", verifyAdmin, addCount);
router.delete("/count/delete", verifyAdmin, deleteCount);
router.patch("/count/update", verifyAdmin, updateCount);
router.patch("/update/:id", verifyAdmin, upload.single("bgImage"), update);

module.exports = router;

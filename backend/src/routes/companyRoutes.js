const router = require("express").Router();
const verifyAdmin = require("../middleware/verifyAdmin");
const multer = require("multer");
const {
  add,
  getSingle,
  update,
  destroy,
  getAll,
  getBySlug,
} = require("../controllers/companyController");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/company");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage: storage });

router.post(
  "/add",
  verifyAdmin,
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "profile", maxCount: 1 },
  ]),
  add
);
router.get("/all", getAll);
router.get("/:id", getSingle);
router.get("/slug/:slug", getBySlug);
router.patch(
  "/update/:id",
  verifyAdmin,
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "profile", maxCount: 1 },
  ]),
  update
);
router.delete("/delete/:id", verifyAdmin, destroy);

module.exports = router;

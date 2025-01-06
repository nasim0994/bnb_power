const router = require("express").Router();
const verifyToken = require("../middleware/verifyToken");
const verifyAdmin = require("../middleware/verifyAdmin");
const {
  add,
  login,
  getAll,
  getMe,
  destroy,
  updateInfo,
  updatePassword,
  deleteAccount,
} = require("../controllers/adminController");

router.post("/add", verifyAdmin, add);
router.post("/login", login);
router.get("/all", verifyAdmin, getAll);
router.get("/loggedUser", verifyToken, getMe);
router.delete("/:id", verifyToken, destroy);
router.put("/updateInfo/:id", verifyToken, updateInfo);
router.put("/updatePassword/:id", verifyToken, updatePassword);
router.delete("/deleteAccount/:id", verifyToken, deleteAccount);

module.exports = router;

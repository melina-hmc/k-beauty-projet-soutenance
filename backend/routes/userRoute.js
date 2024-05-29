const express = require("express");
const router = express.Router();
const { registerUser, loginUser, logout, getUser, getLoginStatus, updateUser, updatePhoto } = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logout);
router.get("/getuser", protect, getUser);
router.get("/getLoginStatus", getLoginStatus);

router.patch("/updateUser", protect, updateUser);
router.patch("/updatePhoto", protect, updatePhoto);

// router.patch("/changepassword", protect, changePassword);
// router.post("/forgotpassword", forgotPassword);
// router.put("/resetpassword/:resetToken", resetPassword);

module.exports = router; 
// Importing the Depandencies...
const express = require("express");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const router = express.Router();
const User = require("../models/User");
const { requireAuth } = require("../middlewares/authMiddlewares");

const authController = require("../controllers/authController");

//*******************IF YOU WANT TO CONTINUE THE authController.js FILE IN HERE*******************//

// router.get(
//   "/auth/google",
//   passport.authenticate("google", { scope: ["profile"] })
// );

// router.get(
//   "/auth/google/callback",
//   passport.authenticate("google", { failureRedirect: "/login" }),
//   function (req, res) {
//     res.redirect("/secret");
//   }
// );

// router.get("/", function (req, res) {
//   res.send("You are in the Home page");
// });

// router.get("/secret", requireAuth, (req, res) => {
//   res.send("This is our little Secret. You must be autherticated.");
// });

// router.get("/currect_user", (req, res) => {
//   res.send(req.user);
// });

// router.get("/logout", (req, res) => {
//   req.logout();
//   res.redirect("/");
// });


router.get("/auth/google", passport.authenticate("google", { scope: ["profile"] }), authController.authGoogle_get);
router.get("/auth/google/callback", passport.authenticate("google", { failureRedirect: "/login" }), authController.authGoogleCallback_get);
router.get("/", authController.home_get);
router.get("/secret", requireAuth, authController.secret_get);  // Using requireAuth Middleware function...
router.get("/currect_user", requireAuth, authController.current_user_get); // Using requireAuth Middleware function...
router.get("/logout", authController.logout_get);

module.exports = router;

const express = require("express");
const router = express();
const {
  ensureAuthenticated,
  forwardAuthenticated,
} = require("../config/auth.js");
const userService = require("../services/userService.js");
const passport = require("passport");

router.post("/register", async (req, res) => {
  try {
    let UserInput = req.body;
    let userRecord = await userService.signUp(UserInput);
    return res.json(userRecord);
  } catch (err) {
    return res.json(err);
  }
});

router.post("/login", forwardAuthenticated, async (req, res, next) => {
  passport.authenticate("local", {
    successMessage: "user logged in",
    failureMessage: "Error",
    successRedirect: "/user",
  })(req, res, next);
});

router.get("/user", ensureAuthenticated, async (req, res) => {
  try {
    const { userid } = req.user;
    let userInfo = await userService.getUserInfo(userid);
    return res.json(userInfo);
  } catch (err) {
    return res.json(err);
  }
});

router.get("/logout", ensureAuthenticated, async (req, res) => {
  req.logout();
});

router.post("/activation", async (req, res) => {
  try {
    let { email } = req.body;
    let Items = await userService.activationRequest(email);
    return res.json(Items);
  } catch (err) {
    return res.json(err);
  }
});

router.put("/activation", async (req, res) => {
  try {
    let { email, token } = req.body;
    let activation = await userService.activationActivate(email, token);
    return res.json(activation);
  } catch (err) {
    return res.json(err);
  }
});

router.post("/forgotp", async (req, res) => {
  try {
    let { email } = req.body;
    let emailSent = await userService.forgotPw(email);
    return res.json(emailSent);
  } catch (err) {
    return res.json(err);
  }
});
router.put("/changepw", async (req, res) => {
  try {
    let { email, token, password } = req.body;
    let userRecord = await userService.changePw(email, token, password);
    return res.json(userRecord);
  } catch (err) {
    return res.json(err);
  }
});

/*
router.get('/google',usercontroller.google);
router.get('/google/callback',usercontroller.googlecallback);
*/
module.exports = router;

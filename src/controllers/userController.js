const express = require('express');
const router = express();
const {
  ensureAuthenticated,
  forwardAuthenticated
} = require('../config/auth.js');
const userService = require('../services/userService.js');
const passport = require('passport');

router.post('/register', async (req, res) => {
  try {
    const UserInput = req.body;
    let Service = await userService.signUp(UserInput);
    res.json(Service);
  } catch {
    res.json('error')
  }
})

router.post('/login', forwardAuthenticated, async (req, res, next) => {
  passport.authenticate('local', {
    successMessage: 'user logged in',
    failureMessage: 'Error',
    successRedirect: '/user'
  })(req, res, next);
})

router.get('/user', ensureAuthenticated, async (req, res) => {
  try {
    const {
      userid
    } = req.user;
    let Items = await userService.getUserInfo(userid)
    res.json(Items)
  } catch {
    res.json('error')
  }
})

router.get('/logout', ensureAuthenticated, async (req, res) => {
  req.logout();
});


router.post('/activation', async (req, res) => {
  try {
    let {
      email
    } = req.body;
    let Items = await userService.activationRequest(email);
    res.json(Items)
  } catch {
    res.json('error')
  }
});

router.put('/activation', async (req, res) => {
  try {
    let {
      email,
      token
    } = req.body;
    let Item = await userService.activationActivate(email, token)
    res.json(Item)
  } catch {
    res.json('error')
  }
});

router.post('/forgotp', async (req, res) => {
  try {
    let {
      email
    } = req.body;
    let Items = await userService.forgotPw(email);
    res.json(Items)
  } catch {
    res.json('error')
  }
});
router.put('/changepw', async (req, res) => {
  try {
    let {
      email,
      token,
      password
    } = req.body;
    let Item = await userService.changePw(email, token, password);
    res.json(Item)
  } catch {
    res.json('error')
  }
});

/*
router.get('/google',usercontroller.google);
router.get('/google/callback',usercontroller.googlecallback);
*/
module.exports = router;
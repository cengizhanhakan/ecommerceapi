const User = require('../models/user');
const Tokens = require("../models/tokens");
const uuid = require('uuid');
const argon2 = require('argon2');
const WishlistModel = require('../models/wishlist')
const CartModel = require('../models/cart')
const mailerService = require('../services/mailerService');


exports.signUp = async (userInputDTO) => {
    const {
        name,
        email,
        password
    } = userInputDTO;
    let Item = await User.findOne({
        email: email
    });
    if (Item) {
        return ({msg:'User already exists'});
    }
    if (password.length <= 6) {
        return ({msg:'password needs to be at least 6 characters'});
    }
    if (name.length == 0) {
        return ({msg:'name cant be empty'});
    }
    let userId = uuid.v4();
    let hashedPassword = await argon2.hash(password);
    let userSaved = await User.create({
        userid: userId,
        name: name,
        email: email,
        password: hashedPassword,
        activationStatus: 0
    })
    if (userSaved) {
        await CartModel.create({
            userid: userId
        })
        await WishlistModel.create({
            userid: userId
        })
    }
    return userSaved

};

exports.getUserInfo = async (id) => {
    return await User.findOne({
        userid: id
    });
};

/*
exports.google = passport.authenticate('google', {
    scope: ['profile']
})

exports.googlecallback = [
    passport.authenticate('google', {
        failureRedirect: '/login'
    }),
    function (req, res) {
        // Successful authentication, redirect home.
        res.redirect('/');
    }
]
*/
exports.activationRequest = async (email) => {
    let userRecord = await User.findOne({
        email: email
    })
    if (userRecord) {
        let activationMail = await mailerService.activationMail(email);
        return activationMail;
    }
    return ({msg:'User does not exist'});
}

exports.activationActivate = async (email, token) => {
    let Token = await Tokens.findOne({
        activationToken: token
    })
    if (!Token) {
        return ({msg:'Token expired'});
    }
    let statusChanged = await User.findOneAndUpdate({
        email: email
    }, {
        activationStatus: 1
    })
    if (statusChanged) {
        await Tokens.findOneAndDelete({
            activationToken: token
        });
        return ({msg:'user activated'});
    }
}


exports.forgotPw = async (email) => {
    let userRecord = await User.findOne({
        email: email
    })
    if (userRecord) {
        let emailService = await mailerService.passwordMail(email);
        return emailService;
    }
    return ({msg:'User does not exist'});
}


exports.changePw = async (email, token, password) => {
    let Token = await Tokens.findOne({
        pwResetToken: token
    })
    if (!Token) {
        return ({msg:'Token expired'});
    }
    let hashedPassword = await argon2.hash(password);
    let passwordUpdated = await User.findOneAndUpdate({
        email: email
    }, {
        password: hashedPassword
    });
    if (passwordUpdated) {
        await Tokens.findOneAndDelete({
            pwResetToken: token
        });
        return ({msg:'password updated'});
    }
}
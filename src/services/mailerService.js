var transport = require("../config/mailtransport");



exports.activationMail = async (email) => {
    var activationToken = crypto.randomBytes(32).toString("hex");
    var message = {
        from: process.env.mailAddress, // Sender address
        to: email, // List of recipients
        subject: 'Activation', // Subject line
        text: ' click this link to activate your mail. http://localhost:3000/activation?token=' + activationToken + '&mail=' + req.query.email + '' // Plain text body
    };
    transport.sendMail(message, async function (err, info) {
        if (err) {
            throw (err)
        } else {
            await Tokens.create({
                createdat: new Date(),
                email: email,
                activationToken: activationToken
            })
        }
    })
}

exports.passwordMail = async (email) => {
    var resetToken = crypto.randomBytes(32).toString('hex');
    var message = {
        from: process.env.mailAddress, // Sender address
        to: email, // List of recipients
        subject: 'Password Reset', // Subject line
        text: ' click this link to reset your password. http://localhost:3000/resetpw/?token=' + resetToken + '&email=' + req.query.email + '' // Plain text body
    };
    transport.sendMail(message, function (err, info) {
        if (err) {
            return err
        } else {
            return ({msg:'Email sent.'})
        }
    });
}
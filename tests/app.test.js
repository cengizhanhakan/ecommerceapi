const mongoose = require('mongoose');
const userData = {
    name: 'cengo',
    email: 'idk@idk.com',
    password: "1231234"
};
const userService = require('../src/services/userService');

describe('User Model Test', () => {
    beforeAll(async () => {
        await mongoose.connect(global.__MONGO_URI__, {
            useNewUrlParser: true,
            useCreateIndex: true
        }, (err) => {
            if (err) {
                console.error(err);
                process.exit(1);
            }
        });
    });

    it('needs to sign up', async () => {
        expect(await userService.signUp(userData)).toBeDefined();
    })
})
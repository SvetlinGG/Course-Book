const bcrypt = require('bcrypt');
const jwt = require('../lib/jsonwebtoken.js');
 

const User = require('../models/User');


exports.register = async(userData) => {
    if(userData.password !== userData.rePassword){
        throw new Error('Username or password is invalid');
    }
    const user = await User.find({email: userData.email});
    if (user){
        throw new Error('User already exists');
    }


    return User.create(userData);
} 

exports.login = async (email, password) => {

        const user = await User.findOne({email});

        if(!user){
            throw new Error('Username or password is invalid');
        }

        const isValid = await bcrypt.compare(password, user.password);

        if(!isValid){
            throw new Error('Username or password is invalid');
        }

        await jwt.sign();
}
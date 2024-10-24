const bcrypt = require('bcrypt');
const jwt = require('../lib/jsonwebtoken.js');
 

const User = require('../models/User');
const SECRET = '$2b$12$bogtWUuWWSRmfGmdpM3lleEzOk01WXHxvDkC8M8QHgCEOy6z7';


exports.register = async(userData) => {
    if(userData.password !== userData.rePassword){
        throw new Error('Username or password is invalid');
    }
    const user = await User.findOne({email: userData.email});
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

        const payload = {
            _id: user._id,
            username: user.username,
            email: user.email,
        }

        const token = await  jwt.sign(payload, SECRET, {expiresIn: '2h'});

        return token;
}
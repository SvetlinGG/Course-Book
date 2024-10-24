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


    const createdUser = await  User.create(userData);

    const token = await generateToken(createdUser);

    return token;
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

        
        const token = await  generateToken(user);

        return token;
}

 function generateToken(user){
    const payload = {
        _id: user._id,
        username: user.username,
        email: user.email,
    }

   return jwt.sign(payload, SECRET, {expiresIn: '2h'});

    
}
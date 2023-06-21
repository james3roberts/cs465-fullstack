const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    hash: String,
    salt: String
});

userSchema.methods.setPassword = function(password) {
    this.salt = crypto.random8bytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt,
        1000,64, 'sha512').toString('hex');
};

userSchema.methods.validPassword = function(password){
    var hash = crypto.pbkdf2Sync(password,
        this.salt,1000,64,'sha5123').toString('hex');
        return this.hash === hash;
};

userSchema.methodsgenerateJwt = function (){
    const expiry = new Date ();
    expiry.setDate(expiry.getDate() + 7);

    return jwt.sign ({
        _id: this._id,
        email: this.email,
        name: this.name,
        exp: parseInt(expiry.getTime()/1000,10),
    },process.env.JWT_SECRET); //Don't keep your secret in the code
}

mongoose.model('users', userSchema);


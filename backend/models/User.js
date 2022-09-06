const mongoose = require('mongoose');
//un seul email possible
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
    username: { type: String, required: true},
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    admin: {type:Boolean,required: true}
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);
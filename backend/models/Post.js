const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    userId: { type: String, required: true },
    titre: { type: String, required: true },
    contenu: { type: String, required: true },
    datePost: { type: Date,required: true},
    imageUrl: { type: String, required: false },
    usersLiked: { type: [String], required: true },
    userName: { type: String, required: true },
});

module.exports = mongoose.model('Post', postSchema);
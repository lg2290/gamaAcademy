var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var postSchema = new Schema({
    title: String,
    body: String,
    image: String
});

var Post = mongoose.model('Post', postSchema);

module.exports = Post;
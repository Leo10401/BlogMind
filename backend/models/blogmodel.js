const { Schema, model, Types } = require('../connection');

const blogSchema = new Schema({
    title: String,
    content: String,
    author: { type: Types.ObjectId, ref: 'user' },
    category: { type: String },
    description: { type: String},
    image: String,
    tags: Array,
    createdAt: { type: Date, default: Date.now }

});

module.exports = model('blog', blogSchema);
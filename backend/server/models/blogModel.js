const mongoose = require('mongoose');

const prayerSchema = new mongoose.Schema({
    title: {
        type: String,
        require: 'Title is required'
    },
    description: {
        type: String,
        require: 'Description is required'
    },
    photo: {
        data: Buffer,
        contentType: String
    },
    type: {
        type: String,
        require: 'Type is required'
    },
    agree: {
        type: Boolean,
        default: false,
    },
    viewed: {
        type: Boolean,
        default: false
    },
    like: {
        type: Number,
        default: 0
    },
    unlike: {
        type: Number,
        default: 0
    },
    postedBy: { type: mongoose.Schema.ObjectId, ref: 'UserInfo' },
    created: {
        type: Date,
        default: Date.now
    }
},
);

const article = mongoose.model("article", prayerSchema);

module.exports = article;
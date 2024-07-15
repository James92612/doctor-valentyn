const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')

const userInfoSchema = new mongoose.Schema({
    provider: {
        type: String,
    },
    name: String,
    firstName: String,
    lastName: String,
    password: {
        type: String,
        require: 'Password is required'
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    mobile: String,
    photo: {
        data: Buffer,
        contentType: String
    },
    birthday: {
        type: String,
    },
    gender: String,
    city: {
        type: String,
    },
    state: {
        type: String,
    },
    zipcode: {
        type: Number,
    },
    country: {
        type: String,
    },
    address: {
        type: String,
    },
    link: {
        type: String
    },
    googleId: {
        type: String,
        unique: true,
        sparse: true,
    },
    // fb
    facebookId: {
        type: String,
        unique: true,
        sparse: true,
    },
    viewed: {
        type: Boolean,
        default: false
    },
    updated: Date,
    following: [{ type: mongoose.Schema.ObjectId, ref: 'UserInfo' }],
    followers: [{ type: mongoose.Schema.ObjectId, ref: 'UserInfo' }],
    comments: [{
        feed: String,
        userName: String,
        title: String,
        created: { type: Date, default: Date.now },
        postedBy: { type: mongoose.Schema.ObjectId, ref: 'UserInfo' },
        dataId: { type: mongoose.Schema.ObjectId, ref: 'Prayer' },
    }],
    created: {
        type: Date,
        default: Date.now
    },
},
);

userInfoSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
};

// Password hashing before saving into database
//  it's a pre-save hook, which means it will run before saving a document to the database.
// Likewise pre, we can use post for some operations which we want to run after the database operation we perform inside the controller
userInfoSchema.pre('save', async function (next) {
    if (!this.isModified('password')) { //if we are modifying the data without modifying the password then it will do nothing, goes to next middleware or else it will hash the password which is given outside the if block.
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

userInfoSchema.methods.generateJWT = function () {
    const token = jwt.sign(
        {
            expiresIn: '12h',
            id: this._id,
            provider: this.provider,
            email: this.email,
        },
        process.env.JWT_SECRET,
    );
    return token;
};


const UserInfo = mongoose.model("UserInfo", userInfoSchema);

module.exports = UserInfo;
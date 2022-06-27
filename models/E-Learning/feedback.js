const mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Feedback = new
    Schema(
        {
            rating: Number,
            comment: String,
            postedAt: { type: Date, default: Date.now },
            user : { type: Schema.Types.ObjectId, ref: 'User' },
            course : { type: Schema.Types.ObjectId, ref: 'courses' },
        }
    );
module.exports = mongoose.model('feedback', Feedback);
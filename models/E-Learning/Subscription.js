const mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Subscription = new
    Schema(
        {
            subscriptionDate : { type: Date, default: Date.now },
            course : { type: Schema.Types.ObjectId, ref: 'courses' },
            user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
        }
    );
module.exports = mongoose.model('subscription', Subscription);
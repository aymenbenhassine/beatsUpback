const mongoose = require('mongoose');
var Schema = mongoose.Schema;
var WishList = new
    Schema(
        {
            user : { type: Schema.Types.ObjectId, ref: 'User' },
            course : { type: Schema.Types.ObjectId, ref: 'courses' },
        }
    );
module.exports = mongoose.model('wishList', WishList);
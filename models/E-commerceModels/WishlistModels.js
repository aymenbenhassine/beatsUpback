const mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Wishlist = new
    Schema(
        {
            user : { type: Schema.Types.ObjectId, ref: 'User' },
            product : { type: Schema.Types.ObjectId, ref: 'products' },
        }
    );
module.exports = mongoose.model('wishlist', Wishlist);
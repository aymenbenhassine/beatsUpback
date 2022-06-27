const mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Ressources = new
    Schema(
        {
            RessourceUrl: String,
            module : { type: Schema.Types.ObjectId, ref: 'module' },
        }
    );
module.exports = mongoose.model('ressources', Ressources);
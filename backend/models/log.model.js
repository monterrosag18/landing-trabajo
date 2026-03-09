const mongoose = require("mongoose");

const logSchema = new mongoose.Schema({

    action:{
        type:String
    },

    entity:{
        type:String
    },

    entity_id:{
        type:String
    },

    data:{
        type:Object
    },

    date:{
        type:Date,
        default:Date.now
    }

});

module.exports = mongoose.model("Log",logSchema);
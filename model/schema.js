const mongoose = require('mongoose');
const Schema =  mongoose.Schema;

const appSchema = new Schema({
    username:{type: 'string',
     required: true,
    },
    email:{
        type: 'string', 
    require: true,
},
    password:{
        type: 'string',
     require: true,
    }
}, {timestamps: true})

const Model =mongoose.model('map', appSchema);

module.exports = Model;
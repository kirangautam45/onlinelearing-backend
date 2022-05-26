const mongoose = require('mongoose');

const Contact = mongoose.model("Contact",{
    fullname : {
        type : String
    },
    email : {
        type : String,
    },
    number : {
        type : String,
    },
    country :{
        type : String,
    },
    subject:{
        type : String
    },
    message:{
        type: String,
    }
})
module.exports = Contact; 
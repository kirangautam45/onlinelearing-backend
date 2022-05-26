const mongoose = require('mongoose');

const User = mongoose.model( 'User', {
    fullname:{
        type : String,
        required : true
    },
    email:{
        type : String,
        unique: true,
        required : true,
        
    },
    username:{
        type : String,
        unique: true,
        required : true,
       
    },
    password:{
        type : String,
        minlength: 6,
       // required : true
    },
    bio:{
       type: String,
       maxlength: 200 
    },
    phone:{
        type: String
    },
    address:{
        type: String
    },
    profile:{
        type: String,
        default:""
    },
    accounttype:{
        type : String,
        enum: ['Professor', 'Learner'],
        //default : 'Learner'
    }
    
});

module.exports = User;
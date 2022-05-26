const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types;

const CourseDetail = mongoose.model("CourseDetail",{
    courseTitle : {
        type : String
    },
    courseDesc : {
        type : String
    },
    courseCategory : {
        type : String,
        enum: ['IOT', 'Android', 'WebDevelopment']
    },
    courseFile :{
        type : String,
        default : "no_file.pdf" 
    },
    fileTitle:{
        type : String
    },
    postDate:{
        type: Date,
        default: Date.now
    },
    addedby:{
        type : ObjectId, 
        ref : 'User'
    }
})
module.exports = CourseDetail; 
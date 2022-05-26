const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types;

const SavedCourse = mongoose.model("SavedCourse",{
    CourseID:{
        type : ObjectId, 
        ref : 'CourseDetail'
    },
    savedby:{
        type : ObjectId, 
        ref : 'User'
    }
})
module.exports = SavedCourse; 
const express = require('express');
const courses = require('../models/course_model');
const auth = require('../middleware/auth');
const uploadFile = require('../middleware/CourseFile');
const SavedCourse = require('../models/SavedCourse');
const router = express.Router();

//for insert
router.post('/course/post', auth.verifyUser, auth.verifyProfessor, uploadFile.single('courseFile'), function(req,res){
    if(req.file == undefined){
        return res.status(400).json({
            message : "plase upload Validate file only!!"
        })
    }
    
    const courseTitle = req.body.courseTitle;
    const courseDesc = req.body.courseDesc;
    const courseCategory = req.body.courseCategory;
    const fileTitle = req.body.fileTitle;
    const courseFile = req.file.filename;
    const addedby = req.user;


    const course = new courses({
        courseTitle : courseTitle,
        courseDesc : courseDesc,
        courseCategory : courseCategory,
        courseFile : courseFile,
        fileTitle : fileTitle,
        addedby : addedby
    })
    course.save()
    .then(function(courseDataSaved){
        res.status(201).json({success : true, message : "New Course Added!!"})
    })
    .catch(function(ex2){
        res.status(500).json({coursePostMessage : ex2})
    })
})
router.post('/course/insert', auth.verifyUser, auth.verifyProfessor, function(req,res){
     
    const courseTitle = req.body.courseTitle;
    const courseDesc = req.body.courseDesc;
    const courseCategory = req.body.courseCategory;
    const fileTitle = req.body.fileTitle;
    const addedby = req.user;
    
    const course = new courses({
        courseTitle : courseTitle,
        courseDesc : courseDesc,
        courseCategory : courseCategory,
        fileTitle : fileTitle,
        addedby : addedby
    })
    //console.log(req.user)
    course.save()
    .then(function(course){
        res.status(201).json({success : true, data: course, coursePostMessage : "Course Posted!!"})
    })
    .catch(function(ex2){
        res.status(500).json({coursePostMessage : ex2})
    })
})

//for update
router.put("/course/update/:courseID", auth.verifyUser, auth.verifyProfessor, function(req, res){
    const courseTitle = req.body.courseTitle;
    const courseDesc = req.body.courseDesc;
    const courseCategory = req.body.courseCategory;
    const fileTitle = req.body.fileTitle;
    const courseID = req.params.courseID;

    courses.updateOne({_id : courseID}, {courseTitle: courseTitle, courseDesc: courseDesc, courseCategory: courseCategory, fileTitle: fileTitle})
    .then(function(result){
        res.status(200).json({success : true, message : "Course Updated!!", data: result})
    })
    .catch(function(e){
        res.status(500).json({error: e})
    })

})
// //for file upload for android
// router.put("/course/:id/photo", auth.verifyUser, auth.verifyProfessor,  uploadFile.single('courseFile'), async function(req, res){
//     if(req.file !== undefined){
//         try{
//             const image = await courses.findOneAndUpdate({_id:req.params.id},{$set:{courseFile : req.file.filename}},{new:true} )
//             res.status(200).json({success : true, courseImg: image})
//         }
//     catch(error){
//         res.status(500).json({error: error})
//     }
// }

// })
//for file upload
router.put("/course/file/:id", auth.verifyUser, auth.verifyProfessor,  uploadFile.single('courseFile'), async function(req, res){  
    if(req.file !== undefined){
        try{
            const file = await courses.findOneAndUpdate({_id:req.params.id},{$set:{courseFile : req.file.filename}},{new:true} )
            res.status(200).json({success : true, courseFile: file})
        }
    catch(error){
        res.status(500).json({error: error})
        console.log(error)
    }
}
else{
    console.log(req.file.filename)
}

})

//for delete
router.delete("/course/delete/:id",auth.verifyUser, auth.verifyProfessor, function(req,res){
    const id = req.params.id;
    courses.deleteOne({_id : id})
    .then(function(result){
        res.status(200).json({success : true, message : "Course Deleted!!"})
    })
    .catch(function(e){
        res.status(500).json({error: e})
    })
})

//this read all courses 
router.get("/course/all", auth.verifyUser, auth.verifyProfessor, function(req,res){
    courses.find()
    .then(function(data){
        res.status(200).json({success : true,count: data.length, data});
    })
    .catch(function(e){
        res.status(500).json({error: e});
    })
})
//this read all courses according to user 
router.get("/course/data", auth.verifyUser, auth.verifyProfessor, async (req,res)=>{
    //console.log(req.user)
    try{
        const course = await courses.find({addedby: req.user._id})  
        res.status(201).json({ success: true, count: course.length, data: course });
    }
    catch(e) {
        res.status(500).json({ err: e })
    }
})

//for delete
router.delete("/course/save/delete/:id",auth.verifyUser, auth.verifyLearner, function(req,res){
    const id = req.params.id;
    SavedCourse.deleteOne({_id : id})
    .then(function(result){
        res.status(200).json({success : true, message : "Course Deleted!!"})
    })
    .catch(function(e){
        res.status(500).json({error: e})
    })
})

//to fecth saved course 
router.get("/course/saved", auth.verifyUser, auth.verifyLearner, function(req,res){
    SavedCourse.find({savedby:req.user._id})
    .then(SavedCourse=>{
        res.status(200).json({success : true, count: SavedCourse.length, data: SavedCourse})
    })
    .catch(function(e){
        res.status(500).json({error: e})
    })
})

//to fecth saved course 
router.get("/course/save", auth.verifyUser, auth.verifyLearner, function(req,res){
    SavedCourse.find({savedby:req.user._id})
    .populate('savedby')
    .populate('CourseID').exec(function(error, data){
        res.status(200).json({success : true,count: data.length, data: data});
    })
})



//this read all courses according to its category 
router.get("/course/:courseCategory", auth.verifyUser, function(req,res){
    const courseCategory = req.params.courseCategory;
    courses.find({courseCategory:courseCategory}).populate('addedby').exec(function(error, data){
        res.status(200).json({success : true,count: data.length, data});
    })
})

//for savd course
router.post("/course/save", auth.verifyUser, auth.verifyLearner, function(req, res){
    const CourseID = req.body.CourseID;
    const savedby = req.user._id;

    const saveCourse = new SavedCourse({
        CourseID : CourseID,
        savedby : savedby
    })

    saveCourse.save()
    .then(function(courseDataSaved){
        res.status(201).json({success : true, coursePostMessage : "Course Posted!!", courseDataSaved})
    })
    .catch(function(ex2){
        res.status(500).json({coursePostMessage : ex2})
    })
})

//this is for individual course
router.get("/course/single/:id",auth.verifyUser, function(req,res){
    const id = req.params.id
    courses.findById({_id:id})
    .then(function(data){
        res.status(200).json({ success: true, data: data});
       // console.log(data);
    })
    .catch(function(e){
        res.status(500).json({error: e});
    })
})


module.exports = router

const courses = require('../models/course_model');
const mongoose = require('mongoose');

const url = "mongodb://localhost:27017/Testing_eKnowledge_Database";

beforeAll(async () =>{
    await mongoose.connect(url, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    });
});

afterAll(async () => {
    await mongoose.connection.close();
});

describe('Course Schema test', () =>{
    //code to insert course details
    it('Add Course Testing', () =>{
        const course = {
            courseTitle : "node js",
            courseDesc : "Intro to nodejs",
            courseCategory : "WebDevelopment",
            courseFile : 'nodejs.pdf',
            fileTitle : "Please click to view file."
        }
        return courses.create(course)
        .then((course_result) => {
            expect(course_result.courseTitle).toEqual('node js');
        });
    });

    //code to test update course
    it('Update Course Testing', () =>{
        return courses.findOneAndUpdate(
            {_id: Object("607da58d3ba7d628740b5c5e")},
            {$set : {courseTitle: "Intro to MongoDB"}},
            {new:true}
        ).then((course_result) => {
            expect(course_result.courseTitle).toEqual("Intro to MongoDB");
        });
    });

    // the code below is for delete testing
    it('to test the delete product is working or not', async() =>{
        const status= await courses.deleteOne({_id: Object("607dc4e713c81132d837dc73")});
        expect(status.ok).toBe(1);
    });


});
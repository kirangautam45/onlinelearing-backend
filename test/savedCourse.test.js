
const SavedCourse = require('../models/SavedCourse');
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

describe('SavedCourse Schema test', () =>{
    // //code to Save Course details
    it('Save Course Testing', () =>{
        const saveCourse = {
            CourseID:"607da58d3ba7d628740b5c5e",
            savedby: "607dcaee6c2e3a0808c666d2"
        }
        return SavedCourse.create(saveCourse)
        .then((course_result) => {
            expect(course_result.CourseID).toEqual(Object("607da58d3ba7d628740b5c5e"));
        });
    });

 // the code below is for delete testing
    it('to test the delete saved course is working or not', async() =>{
        const status= await SavedCourse.deleteOne({_id: Object("607dd525c67a541e58305cd6")});
        expect(status.ok).toBe(1);
    });

});
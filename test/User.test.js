
const Users = require('../models/users_model');
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

describe('User Schema test', () =>{
    // //code to insert User details
    it('Add Course Testing', () =>{
        const users = {
            fullname:"Test Second User",
            email: "seconduser@gmail.com",
            username : "secondUser",
            password : "password",
            accounttype:"Professor",
            profile: "photo.jpg"
        }
        return Users.create(users)
        .then((user_result) => {
            expect(user_result.fullname).toEqual("Test Second User");
        });
    });

    // //code to test update user
    it('Update User Testing', () =>{
        return Users.findOneAndUpdate(
            {_id: Object("607dcaee6c2e3a0808c666d2")},
            {$set : {profile: "image.jpg"}},
            {new:true}
        ).then((user_result) => {
            expect(user_result.profile).toEqual("image.jpg");
        });
    });

      //code to test Get User Details
      it('Get User Details Testing', () =>{
        return Users.findById(
            {_id: Object("607dcaee6c2e3a0808c666d2")}
        ).then((user_result) => {
            expect(user_result.username).toEqual("testuser");
        });
    });
});
const express = require('express');
const Users = require('../models/users_model');
const router = express.Router();
const{check, validationResult} = require('express-validator');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {JWT_SECRET} = require('../key');
const { verifyUser } = require('../middleware/auth');
const upload = require('../middleware/file_upload')


//Insert
router.post('/user/insert', 
[
    check('fullname','Fullname is required!!').not().isEmpty(),
    check('email','Email is required!!').not().isEmpty(),
    check('username','Username is required!!').not().isEmpty(),
    check('password','Password is required!!').not().isEmpty()

],
 (req,res)=>{

    const validationErr = validationResult(req);
    
    if(validationErr.isEmpty())
    {
        // for valide user 
        // const fullname = req.body.fullname;
        // const email = req.body.email;
        // const username = req.body.username;
        // const password = req.body.password;
        // const accounttype = req.body.accounttype;
        const {fullname,email,username,password,accounttype} = req.body
        Users.findOne({email:email, username:username})
        .then((savedUser)=>{
            if(savedUser){
                return res.status(422).json({message:"User already exists with this email"})
            }
            bcryptjs.hash(password, 10)
            .then(hash_password=>{
                const user = new Users({
                    fullname,
                    email,
                    username,
                    password : hash_password,
                    accounttype
                })
                user.save()
                .then(user=>{
                    res.status(201).json({success : true, message : "You have registered successfully.", data : user})
                })
                .catch(ex1=>{
                    res.status(500).json({errorMessage : ex1})
                })
            })
        })
        .catch(err =>{
            console.log(err)
        })
        
    }
    else
    {
        res.status(400).json(validationErr.array());
    }

});
router.put('/user/update/:id', verifyUser, (req,res)=>{
        const userID = req.params.id
        const {fullname,email,username,address,phone,bio} = req.body
        Users.updateOne({_id: userID}, {fullname, email, username, address, phone, bio})
        .then(user=>{
            res.status(201).json({success : true, message : "User update succefully!!", data : user})
        })
        .catch(ex1=>{
            res.status(500).json({errorMessage : ex1})
        })

});



router.post('/user/login',(req,res)=>{
    const {username,password} = req.body
    if(!username || !password){
        //No data was found in the database
        return res.status(403).json({
            success : false,
            message : "Please insert username or password!!"})
    }
    Users.findOne({username : username})
    .then(savedUser=>{
        if(!savedUser){
            //No data was found in the database
            return res.status(403).json({
                success : false,
                message : "Invalid Login!!"})
        }
        //if username found in database

        bcryptjs.compare(password, savedUser.password, function(ex2, passwordResult){
            if(passwordResult === false){
                return res.status(403).json({
                    success : false,
                    message : "Invalid Login!!"})
            }
            
        //if username and password match then token generate
        const token = jwt.sign({uid : savedUser._id}, JWT_SECRET)
        res.status(200).json({token : token, success :  true, data: savedUser})
        })
    })  
    .catch(function (e){
        res.status(500).json({error : e})
    })
})

//for file upload
router.put("/user/photo/:id", verifyUser,  upload.single('profile'), async function(req, res){
    if(req.file !== undefined){
        try{
            const image = await Users.findOneAndUpdate({_id:req.params.id},{$set:{profile : req.file.filename}},{new:true} )
            res.status(200).json({success : true, message: "Profile saved Succefully!!",profile: image})
        }
    catch(error){
        res.status(500).json({error: error})
    }
}

})

router.get("/user/getme", verifyUser, async (req,res)=>{
    //const id = req.user;
    try{
        const user = await Users.findOne(req.user._id)
        res.status(200).json({success : true, data: user});
    }
    catch(e){
        res.status(500).json({error: e});
    }
})



module.exports = router;
const express = require('express');
const Contact = require('../models/contact');
const router = express.Router();


router.post('/contact/insert', function(req,res){
     
    const fullname = req.body.fullname;
    const email = req.body.email;
    const number = req.body.number;
    const country = req.body.country;
    const subject = req.body.subject;
    const message = req.body.message;
    
    const cont = new Contact({
        fullname : fullname,
        email : email,
        number : number,
        country : country,
        subject : subject,
        message : message
    })
    cont.save()
    .then(function(cont){
        res.status(201).json({success : true, data: cont, message : "Your message was sent."})
    })
    .catch(function(ex2){
        res.status(500).json({message : ex2})
    })
})
module.exports = router
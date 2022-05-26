//the function of authorization 
const jwt = require('jsonwebtoken');
const {JWT_SECRET} = require('../key');
const User = require('../models/users_model');

// main guard......
module.exports.verifyUser = async function(req, res, next){
    try{
        const token = req.headers.authorization.split(" ")[1];
        const data = jwt.verify(token, JWT_SECRET);
        await User.findOne({_id : data.uid})
        .then(userdata =>{ //userdata store all the deatils of the user
           // console.log(userdata);
            req.user = userdata;
            next();
        })
        .catch(function(ex){
            res.status(401).json({error : ex})
        })
    }
    catch(ex){
        res.status(401).json({error : ex})
    }
}

//second guard
module.exports.verifyLearner = function(req,res,next){
    if(!req.user){
        return res.status(401).json({message : "Invalid User!"});
    }
    else if(req.user.accounttype !=='Learner'){
        return res.status(401).json({message : "Unauthorized!!"})
    }
    next();
}

//third guard
module.exports.verifyProfessor = function(req,res,next){
    if(!req.user){
        return res.status(401).json({message: "Invalid User!"});
    }
    else if(req.user.accounttype !=='Professor'){
        return res.status(401).json({message : "Unauthorized!!"})
    }
    next();
}

/* //four guard (if two type of users can access same route)
module.exports.verifyProfessor = function(req,res,next){
    if(!req.userData){
        return res.status(401).json({messag : "Invalid User!"});
    }
    else if(req.userData.accounttype!=='Professor' || req.userData.accounttype!=='Learner'){
        return req.status(401).json({message : "Unauthorized!!"})
    }
    next();
} */



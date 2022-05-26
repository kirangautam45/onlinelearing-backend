const multer = require('multer');

const storage = multer.diskStorage({
    destination : function(req, file, cb){
        cb(null, './public/uploads')
    },
    filename : function(req,file,cb){
        cb(null,Date.now() + file.originalname)
    }
})

//for filtering image and pdf
const filter = function(req,file,cb){
    //for pdf only 
    //if(file.mimetype == 'application/pdf'){
    //for image only 
    if(file.mimetype == 'image/jpg' || file.mimetype == 'image/png' || file.mimetype == 'image/jpeg' ){
        cb(null,true)
    }
    else{
        cb(null,false)
    }
}
const upload = multer({
    storage : storage,
    fileFilter : filter 
    
});


module.exports = upload;
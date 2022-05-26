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
    if(file.mimetype == 'application/pdf' || file.mimetype == 'file/pdf' || file.mimetype == 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||  file.mimetype == 'application/docx' || file.mimetype == 'file/vnd.openxmlformats-officedocument.wordprocessingml.document'){
        cb(null,true)
    }
    //for image only 
    // if(file.mimetype == 'image/jpg' || file.mimetype == 'image/png' || file.mimetype == 'image/jpeg' ){
    //     cb(null,true)
    // }
    else{
        cb(null,false)
    }
}
const uploadFile = multer({
    storage : storage,
    fileFilter : filter 
    
});


module.exports = uploadFile;
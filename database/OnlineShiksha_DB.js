const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
console.log("mongoose server is running");
mongoose.connect('mongodb://127.0.0.1:27017/OnlineShiksha_Database',{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

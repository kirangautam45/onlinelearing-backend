const express = require('express');
const bodyParser = require('body-parser');
const database = require('./database/OnlineShiksha_DB');
const users_route = require('./routes/users_route');
const course_route = require('./routes/course_route');
const contact_route = require('./routes/contact');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({extended:false}));
app.use(users_route)
app.use(course_route)
app.use(contact_route);


app.use(express.static('public'))


app.listen(90);
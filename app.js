const express = require('express')
const app = express()
const port = 3000
const web = require('./routes/web')
const connectDb =require('./db/connectdb');

//connection flash and sessions
const session = require('express-session');
const flash = require('connect-flash');
const cookieparser = require("cookie-parser");

const fileUpload = require('express-fileupload');
app.use(fileUpload({useTempFiles:true}));

//token get
app.use(cookieparser());

// connectDb
connectDb();
// ejs route 
app.set('view engine', 'ejs')
// css img link 
app.use(express.static('public'))
// parse application/x-www-form-urlencooded

app.use(express.urlencoded({extended:false}))

//messages
app.use(session({
  secret: 'secret',
  cookie: {maxAge: 60000},
  resave: false,
  saveUninitialized: false
}));
//flash messages
app.use(flash());

// route //
app.use('/',web)

app.listen(port, () => {
  console.log(`Server start localhost: ${port}`)
})

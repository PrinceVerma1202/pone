const mongoose = require('mongoose')
const Db_liveurl = 'mongodb+srv://pv43209:1234@cluster0.jgtwobe.mongodb.net/gungun?retryWrites=true&w=majority'
const local_url = 'mongodb://127.0.0.1:27017/gungun'
const connectDb = ()=>{
    return mongoose.connect(Db_liveurl)
    .then(()=>{
        console.log("connect successfully");
    }).catch((error)=>{
        console.log(error);
    })
};

module.exports= connectDb;
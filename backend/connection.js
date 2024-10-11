const mongoose = require('mongoose');
const url = "mongodb+srv://hunterleo626217:ayushkumar@cluster0.k1rln.mongodb.net/blog?retryWrites=true&w=majority&appName=Cluster0"
mongoose.connect(url)
.then((result) => {
    console.log('connected to the db');
    
}).catch((err) => {
    console.log(err);    
});
module.exports= mongoose;
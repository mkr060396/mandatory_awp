const mongoose = require('mongoose');
const mongoDB = "mongodb+srv://maria:rehgar123@cluster0.e7roh.mongodb.net/auction_db?retryWrites=true&w=majority";
mongoose.connect(mongoDB, { useNewUrlParser: true })
.then(() => console.log('The database is now connected!'))
.catch(err => console.log(err));
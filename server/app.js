/**** External libraries ****/
const express = require('express'); // The express.js library for implementing the API
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');



/**** Configuration ****/
const appName = "Express API Template"; // Change the name of your server app!
const port = process.env.PORT || 8080; // Pick port 8080 if the PORT env variable is empty.
const app = express(); // Get the express app object.

app.use(bodyParser.json()); // Add middleware that parses JSON from the request body.
app.use(morgan('combined')); // Add middleware that logs all http requests to the console.
app.use(cors()); // Avoid CORS errors. https://en.wikipedia.org/wiki/Cross-origin_resource_sharing

/**DB**/

const mongoDB = "mongodb+srv://maria:rehgar123@cluster0.e7roh.mongodb.net/auction_db?retryWrites=true&w=majority";
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true })
.then( async() => {await app.listen(port)
console.log('The database is now connected!')} )
.catch(err => console.log(err));

/**** Routes ****/

// Return all recipes in data
app.get('/api/items', (req, res) => res.json(Items));

// PostAnswer
app.post('/api/items/:id/bid', (req, res) => {
    const id = parseInt(req.params.id);
    const bid = req.body.bid;
    const item = items.find(q => q.id === id);
    item.bid.push(bid);
    console.log(item);
    res.json({msg: "Answer added", item: item});
});

app.post('/api/items/newitem', (req, res) => {
    const text = req.body.text;
    let item = {id:items.length+1,item:text,bid:[]};
    items.push(item);

    res.json({msg: "Item added", item: item})

})

/**** Start! ****/
app.listen(port, () => console.log(`${appName} API running on port ${port}!`));

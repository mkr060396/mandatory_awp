/**** External libraries ****/
const express = require('express'); // The express.js library for implementing the API
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');

/**** Configuration ****/
const appName = "Express API Template"; // Change the name of your server app!
const port = process.env.PORT || 8080; // Pick port 8080 if the PORT env variable is empty.
const app = express(); // Get the express app object.

app.use(bodyParser.json()); // Add middleware that parses JSON from the request body.
app.use(morgan('combined')); // Add middleware that logs all http requests to the console.
app.use(cors()); // Avoid CORS errors. https://en.wikipedia.org/wiki/Cross-origin_resource_sharing

/**** Some test data ****/
let answersID = 0;
const questions = [
    {
        id: 0,
        question: "How to add Bootstrap to React?",
        answers: [
            {id: answersID++, text: "I don't know??", votes: 0},
            {id: answersID++, text: "Run npm i bootstrap in your project", votes: 0}
        ]
    },
    {
        id: 1,
        question: "How do I code things?",
        answers: ["IDK", "See answer 1"]
    },
    {
        id: 2,
        question: "How do I uninstall my life?",
        answers: ["Plan C", "Sudoku"]
    },
];

/**** Routes ****/

// Return all recipes in data
app.get('/api/questions', (req, res) => res.json(questions));

// PostAnswer
app.post('/api/questions/:id/answers', (req, res) => {
    const id = parseInt(req.params.id);
    const text = req.body.text;
    const question = questions.find(q => q.id === id);
    const answer = {id: answersID++, text: text, votes: 0};
    question.answers.push(answer);
    console.log(question);
    res.json({msg: "Answer added", question: question});
});

app.post('/api/questions/newquestion', (req, res) => {
    const text = req.body.text;
    let question = {id:questions.length+1,question:text,answers:[]};
    questions.push(question);

    res.json({msg: "Question added", question: question})

});

app.put('/api/questions/:id/answers/:aid', (req, res) => {
    const id = parseInt(req.params.id);
    const aid = parseInt(req.params.aid);
    const question = questions.find(q => q.id === id);
    const answer = question.answers.find(a => a.id === aid);
    answer.votes++;
    res.json({msg: "Answer voted", answer: answer})

});

/**** Start! ****/
app.listen(port, () => console.log(`${appName} API running on port ${port}!`));

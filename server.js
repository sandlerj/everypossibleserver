const express = require('express')
const bodyParser = require('body-parser')
const res = require('express/lib/response')
const cors = require('cors');

const PORT = 3000

let reset = true
let title = 1

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))

app.use(bodyParser.json())
app.use(cors({
    origin: '*'
}));
app.get('/', (req,res) => {
    res.json({"message": "Server is running :D"});
});

app.get("/title", getTitle);

app.put("/title", updateTitle);

app.listen(PORT, () => {
    console.log(`Server is listening at localhost:${PORT}`);
})

function getTitle(req, res) {
    let title_res = title
    if (reset){ 
        title_res = 0;
    }
    res.json({"title" : title_res})
}

function updateTitle(req, res) {
    let title_n
    try{
        title_n = parseInt(req.body.title);
    } catch (err) {
        res.status(400).send({
            message: err.message
        })
    }
    if (Number.isNaN(title_n)) {
        res.status(400).send({
            message: "Invalid title"
        })
    } else {
        title = title_n
        reset = false
        res.status(200).send({
            message: `Title updated: ${title}`
        })
    }

}
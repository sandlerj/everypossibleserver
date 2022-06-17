const path = require('path');
const Max = require('max-api');
const axios = require('axios')

const instance = axios.create({
    baseURL: 'https://every-possible-server.glitch.me',
    timeout: 1000
})

Max.post(`Loaded the ${path.basename(__filename)} script`);

Max.addHandler("bang", getTitle);

Max.addHandler("title", (msg) => {
    setTitle(msg)
})

function getTitle() {
    instance.get("/title")
    .then(res => {
        let title_n = parseInt(res.data.title)
        Max.outlet(title_n)
    }).catch(err => {
        Max.post(`Error - ${err}`)
    })
}

function setTitle(msg) {
    let title_n = parseInt(msg)
    let data = {
        "title" : title_n
    }
    instance.put("/title", data)
    .then(res => {
        if (res.status == 200) {
            Max.outlet(title_n)
        }
    }).catch(err => {
        Max.post(`Error - ${err.response.status} - ${err.response.message}`)
    })
}
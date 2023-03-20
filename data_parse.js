const fs = require("fs")
const express = require("express")
const app = express()
const cors = require("cors")
app.use(cors({
    origin: "*"
}))


app.get("/", function (req, res) {
    let jsondata = []

    fs.readFile("data.txt", "utf-8", (err, data) => {
        if (err) {
            console.log(err)
        }
        jsondata = JSON.parse(data)
        res.send(JSON.stringify(jsondata))
    })
}
)
app.listen("8080", () => {
    console.log("listening on port 8080")
})

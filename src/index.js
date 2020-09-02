const express = require("express");
const app = express();
const fs = require("fs");
const bodyParser = require("body-parser");
require("dotenv/config");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const {table} = require("table")
const mongoose = require("mongoose");
const router = require("./routes/example.route");
const colors = require("colors");

mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true })

app.use(bodyParser.json())
app.use(cors())

let data = [
    ['', ' -- HTTP Routes Files -- ', ''],
    ['Route', 'File', 'Status']
]



fs.readdir(__dirname + "/routes", (err, files) => {
    files.forEach((file) => {
        try {
            var name = file.split(".")[0]

            app.use(`/${name}`, require(__dirname + "/routes/" + file))

            data.push(['/' + name, file, 'Success'.green])
        } catch (error) {
            data.push(['/' + name, file, error.red])
        }
    })

    let config = {
        border: {
            topBody: `─`,
            topJoin: `┬`,
            topLeft: `┌`,
            topRight: `┐`,

            bottomBody: `─`,
            bottomJoin: `┴`,
            bottomLeft: `└`,
            bottomRight: `┘`,

            bodyLeft: `│`,
            bodyRight: `│`,
            bodyJoin: `│`,

            joinBody: `─`,
            joinLeft: `├`,
            joinRight: `┤`,
            joinJoin: `┼`
        }
    }

    let output = table(data, config)
    console.log(output)





})

let modeldata = [
    ['', ' -- Mongoose Models -- ', ''],
    ['Name', 'File', 'Status'],

]

fs.readdir(__dirname + "/models", (err, files) => {
    files.forEach((file) => {
        try {
            var name = file.split(".")[0]

            modeldata.push([name, file, 'Success'.green])
        } catch (error) {
            modeldata.push([name, file, error.red])
        }
    })

    let config = {
        border: {
            topBody: `─`,
            topJoin: `┬`,
            topLeft: `┌`,
            topRight: `┐`,

            bottomBody: `─`,
            bottomJoin: `┴`,
            bottomLeft: `└`,
            bottomRight: `┘`,

            bodyLeft: `│`,
            bodyRight: `│`,
            bodyJoin: `│`,

            joinBody: `─`,
            joinLeft: `├`,
            joinRight: `┤`,
            joinJoin: `┼`
        }
    }

    let output = table(modeldata, config)
    console.log(output)





})

app.get("/", (req, res) => {
    res.json({
        status: "OK"
    })
})

setTimeout(() => {
    app.listen(process.env.PORT, () => {
        

        let routesdata = [
            ['', ' -- Routes -- ', ''],
            ['Method', 'Path', 'Status'],

        ]

        const all_routes = require('express-list-endpoints');
        
        all_routes(app).forEach((route) => {
            routesdata.push([route.methods.toString().red, route.path.yellow, "Success".green])


        })

        let config = {
            border: {
                topBody: `─`,
                topJoin: `┬`,
                topLeft: `┌`,
                topRight: `┐`,

                bottomBody: `─`,
                bottomJoin: `┴`,
                bottomLeft: `└`,
                bottomRight: `┘`,

                bodyLeft: `│`,
                bodyRight: `│`,
                bodyJoin: `│`,

                joinBody: `─`,
                joinLeft: `├`,
                joinRight: `┤`,
                joinJoin: `┼`
            }
        }

        let output = table(routesdata, config)
        console.log(output)

        console.log("Listening on " + process.env.PORT)



    })
}, 100)



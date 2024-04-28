const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose');

const blogRoutes = require('./routes/blogRoutes')

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

const dbURI = 'mongodb://127.0.0.1/micro-services';

mongoose.connect(dbURI).then(res => {
    app.listen(3334, () => {
        console.log('blogs server is running in port 3334')
    })
}).catch(() => {
    console.log('some thing went down')
})


app.use('/', blogRoutes)

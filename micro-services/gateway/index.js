const express = require('express')
const bodyParser = require('body-parser')
const proxy = require("express-http-proxy")

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

const auth = (req, res, next) => {
if(req.headers.token === 'true'){
    next()
}
res.send('your auth got failed')
}

app.use('/api/v1.0.0/users', auth, proxy('http://localhost:3335'))
app.use('/api/v1.0.0/blogs', auth, proxy('http://localhost:3334'))

app.listen(3333, () => {
    console.log('server is running in port 3333')
})
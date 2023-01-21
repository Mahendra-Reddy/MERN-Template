const express = require('express')
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const blogRouter = require('./routers/blogRoutes')
const userRouter = require('./routers/userRoutes')
const authRouter = require('./routers/authRoutes')
const passport = require('passport')
const config = require('./config.json')
const app = express()

const BearerStrategy = require('passport-azure-ad').BearerStrategy;

const EXPOSED_SCOPES = ['access_as_user']

const options = {
    identityMetadata : `https://${config.metadata.authority}/${config.credentials.tenantID}/${config.metadata.version}/${config.metadata.discovery}`,
    issuer: `https://${config.metadata.authority}/${config.credentials.tenantID}/${config.metadata.version}`,
    clientID: config.credentials.clientID,
    audience: config.credentials.audience,
    validateIssuer: config.settings.validateIssuer,
    passReqToCallback: config.settings.passReqToCallback,
    scope: EXPOSED_SCOPES
}

const dbURI = 'mongodb://127.0.0.1/Mahendra';

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true }).then(result => {
    app.listen(7777, () => {
        console.log('server is running in port 7777')
    })
}).catch(err => {
    console.log(err)
})

const bearerStrategy = new BearerStrategy(options, (token, done) => {
    console.log(token, '++++')
    done(null, {}, token)
})

app.use(passport.initialize());


passport.use(bearerStrategy)

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, access_token, Origin, X-Requested-With, Content-Type, Accept');
    next();
});




app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

app.get('/api/test/auth', passport.authenticate('oauth-bearer', {session: false}), (req, res)=>{
console.log(req, res, '+++++')
})

app.use('/blog', blogRouter)
app.use('/user', userRouter)
app.use('/', authRouter)

app.use((req, res) => {
    res.sendFile('./views/error.html', { root: __dirname })
})


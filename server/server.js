const express = require('express')
const engine = require('express-handlebars')
const path = require('path')
const methodOverride = require('method-override')
const cors = require('cors')
require("dotenv").config()
var cookieSession = require('cookie-session')

const route = require('./routes')
const db = require('./config/db')

const app = express()

db.connect()

const POST = 5000

app.use(methodOverride('_method'))

app.use(express.urlencoded({
    extended: true
}))

app.use(express.json())
app.use(cors())


app.set('trust proxy', 1)

app.use(cookieSession({
    name: 'session',
    keys: ['key1', 'key2']
}))

var hbs = engine.create({
    helpers: {
        sayHello: function () { alert("Hello World") },
        getStringifiedJson: function (value) {
            return JSON.stringify(value);
        },

        sum: (a, b) => a + b,

    },
    defaultLayout: 'main',
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'resources', 'views'))
app.use(express.static(path.join(__dirname, 'public')))

route(app)

app.listen(POST, () => {
    console.log(`Server listening at http://localhost:${POST}`)
})
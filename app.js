const express = require('express')
const path = require('path')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const connectDB = require('./config/db')
const morgan = require('morgan')
const exphbs = require('express-handlebars')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)


const app = express()

// Load config
dotenv.config({ path: './config/config.env' })

// Passport config
require('./config/passport')(passport)

// Connect database dari db.js
connectDB()

// Body parser
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// Logging
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

// Handlebars Helpers
const {
    select,
} = require('./helpers/hbs')

// Handlebars
app.engine(
    '.hbs',
    exphbs({
      helpers: {
        select,
      },
      defaultLayout: 'main',
      extname: '.hbs',
    })
)
app.set('view engine', '.hbs')

// Sessions
app.use(
    session({
      secret: 'keyboard cat',
      resave: false,
      saveUninitialized: false,
      store: new MongoStore({ mongooseConnection: mongoose.connection }),
    })
)

// Passport middleware
app.use(passport.initialize())
app.use(passport.session())

// Static folder
app.use(express.static(path.join(__dirname, 'public')))

// Routes
app.use('/', require('./routes/index'))
app.use('/auth', require('./routes/auth'))
app.use('/consultant', require('./routes/consultant'))

const PORT = process.env.PORT || 3000

// Listening to server
app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));

// app.use(function(req, res, next) {
//   if (process.env.NODE_ENV === "development") {
//       const reqType = req.headers["x-forwarded-proto"];
//       // if not https redirect to https unless logging in using OAuth
//       if (reqType !== "https") {
//           req.url.indexOf("auth/google") !== -1
//             ? next()
//             : res.redirect("https://" + req.headers.host + req.url);
//       } 
//   } else {
//       next();
//   }
// }); 
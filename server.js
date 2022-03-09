const bodyParser = require('body-parser')
require('dotenv').config();
const express = require('express');
const app = express();
const routes = require('./routes');
const path = require('path');
const mongoose = require('mongoose');
mongoose.connect(process.env.CONNECTIONSTRING, {useNewUrlParser: true, useUnifiedTopology:true})
    .then(() => app.emit('load'))
    .catch(e => console.log(e)); 
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
// const helmet =  require('helmet');
const csrf = require('csurf');
// COnfigurações da seção
const sessionOption = session({
    secret: 'Section',
    store: MongoStore.create({mongoUrl: process.env.CONNECTIONSTRING}),
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true
    }
});

// app.use(helmet());
app.use(sessionOption);
app.use(flash());

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.resolve(__dirname, 'public')));

app.set('views', path.resolve(__dirname, 'src', 'views'));

app.set('view engine', 'ejs');

app.use(csrf());

const {middlewareMain ,checkCsrfError, csrfMiddleware} = require('./src/middlewares/middleware')
app.use(middlewareMain);
app.use(checkCsrfError);
app.use(csrfMiddleware);

app.use(routes);

app.on('load', () => {
    app.listen(3000, () => {
        console.log('http://localhost:3000');
        console.log('Servidor em execução');
    });
});

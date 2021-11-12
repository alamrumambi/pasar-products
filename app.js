const express = require('express')
const app = express()
const port = process.env.port || 3000
const session = require('express-session');

app.set('view engine', 'ejs');
app.use(require('cors')());
app.use(require('express-fileupload')());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: false, limit: '50mb' }));
app.use(express.static('public'));
app.use(session({
    secret: 'keyboard cat session',
    resave: false,
    saveUninitialized: true
}))
app.use(require('./routes'));
app.use(require('./middlewares/errorHandler'));

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
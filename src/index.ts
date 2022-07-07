import express from 'express'
import bodyParser from 'body-parser'
import './controller/LoginController'
import './controller/CrowllerController'
import cookieSession from 'cookie-session';
import router from './router';

const app = express();

app.use(bodyParser.urlencoded({ extended: false}))
app.use(cookieSession({
    name: 'session',
    keys: ['teacher dell'],
    maxAge: 24 * 60 * 60 * 1000
}))


app.use(router)

app.listen(5000, () => {
    console.log(`server is running localhost:5000}`);
    
})
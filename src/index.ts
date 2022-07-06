import express from 'express'
import bodyParser from 'body-parser'
// import router from './router'
import './controller/LoginController'
import './controller/crowllerController'
import { router } from './controller/decorator';
import cookieSession from 'cookie-session';

const app = express();

app.use(bodyParser.urlencoded({ extended: false}))
app.use(cookieSession({
    name: 'session',
    keys: ['teacher dell'],
    maxAge: 24 * 60 * 60 * 1000
}))


app.use(router)

app.listen(5001, () => {
    console.log('server is running');
    
})
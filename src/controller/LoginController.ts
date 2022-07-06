import { Router, Request, Response, NextFunction } from 'express'
import 'reflect-metadata'
import { controller, get, post } from './decorator'
import { getResponseData } from '../utils/util'

interface BodyRequest extends Request {
    body: {
        [key: string]: string
    }
}


@controller
class LoginController {
    @post('/login')
    login() {

    }

    @get('/logout')
    logout(req: BodyRequest, res: Response) {
        if (req.session) {
            req.session.login = undefined;
            res.json(getResponseData(true))
        }
    }

    @get('/')
    home(req: BodyRequest, res: Response) {
        // 判断登录
        const isLogin = req.session ? req.session.login : false
        if (isLogin) {
            res.send(`
            <html>
                <body>
                    <a href="/getData">爬取内容</a>
                    <a href="/showData">展示内容</a>
                    <a href="/logout">退出</a>
                </body>
            </html>`)
        } else {
            res.send(`
                <html>
                    <body>
                        <form method="post" action="/login">
                            <input type="password" name="password" />
                            <button>login</button>
                        </form>
                    </body>
                </html>
            `)
    
        }
    }
}
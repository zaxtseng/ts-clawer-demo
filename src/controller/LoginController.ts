import 'reflect-metadata'
import { Request, Response } from 'express'
import { controller, get, post } from '../decorator'
import { getResponseData } from '../utils/util'

interface BodyRequest extends Request {
    body: {
        [key: string]: string | undefined
    }
}


@controller('/')
export class LoginController {
    static isLogin(req: BodyRequest): boolean {
        return !!(req.session ? req.session.login : false)
    }
    @post('/login')
    login(req: BodyRequest, res: Response): void {
        const { password } = req.body;
        const isLogin = LoginController.isLogin(req);
        if (isLogin) {
            res.json(getResponseData(false,"already login!"))
        } else {
            if (password === '123' && req.session) {
                req.session.login = true
                res.json(getResponseData(true))
            } else {
                res.json(getResponseData(false,"login error"))
            }
        }
    }

    @get('/logout')
    logout(req: BodyRequest, res: Response): void {
        if (req.session) {
            req.session.login = undefined;
        }
        res.json(getResponseData(true))
    }

    @get('/')
    home(req: BodyRequest, res: Response): void {
        // console.log('req: ', req);
        // 判断登录
        const isLogin = LoginController.isLogin(req);
        // console.log('isLogin: ', isLogin);
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
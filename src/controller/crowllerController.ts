import fs from 'fs'
import path from 'path'
import { Router, Request, Response, NextFunction } from 'express'
import 'reflect-metadata'
import { controller, get, use } from './decorator'
import { getResponseData } from '../utils/util'
import Crawler from '../utils/crowller'
import DellAnalyzer from '../utils/dellAnalyzer'

interface BodyRequest extends Request {
    body: {
        [key: string]: string
    }
}

// 判断登录的中间件
const checkLogin = (req: BodyRequest, res: Response, next: NextFunction) => {
    const isLogin = req.session ? req.session.login : false;
    if (isLogin) {
        next()
    } else {
        res.json(getResponseData(null,"请先登录!"))
    }
}

@controller
class CrowllerController {
    @get('/getData')
    @use(checkLogin)
    getData(req: BodyRequest, res: Response) {
        const url = `https://yunp.top/app`;
        const analyzer = DellAnalyzer.getInstance()
        new Crawler(url, analyzer);
    
        res.send('getData Success!')
    }

    @get('/showData')
    @use(checkLogin)
    showData(req: BodyRequest, res: Response) {
        try {
            const position = path.resolve(__dirname, '../../data/course.json');
            const result = fs.readFileSync(position, 'utf-8')
            res.json(JSON.parse(result))
        } catch (e) {
            res.send('请登录后查看')
        }
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
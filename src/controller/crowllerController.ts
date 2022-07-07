import fs from 'fs'
import path from 'path'
import { Router, Request, Response, NextFunction } from 'express'
import 'reflect-metadata'
import { controller,get, use } from '../decorator'
import { getResponseData } from '../utils/util'
import Crawler from '../utils/crowller'
import DellAnalyzer from '../utils/dellAnalyzer'

interface BodyRequest extends Request {
    body: {
        [key: string]: string | undefined
    }
}

// 判断登录的中间件
const checkLogin = (req: Request, res: Response, next: NextFunction): void => {
    const isLogin = !!(req.session ? req.session.login : false);
    if (isLogin) {
        next()
    } else {
        res.json(getResponseData(null,"请先登录!"))
    }
}

@controller('/')
export class CrowllerController {
    @get('/getData')
    @use(checkLogin)
    getData(req: BodyRequest, res: Response): void {
        const url = `https://yunp.top/app`;
        const analyzer = DellAnalyzer.getInstance()
        new Crawler(url, analyzer);
    
        // res.send('getData Success!')
        res.json(getResponseData(true))
    }

    @get('/showData')
    @use(checkLogin)
    showData(req: BodyRequest, res: Response): void {
        try {
            const position = path.resolve(__dirname, '../../data/course.json');
            const result = fs.readFileSync(position, 'utf-8')
            res.json(getResponseData(JSON.parse(result)))
        } catch (e) {
            // res.send('请登录后查看')
            res.json(getResponseData(false,'请登录后查看'))
        }
    }
}
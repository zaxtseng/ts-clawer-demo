import { Router, Request, Response } from 'express'
import Crawler from './crowller'
import DellAnalyzer from './dellAnalyzer'

const router = Router();
interface RequestWithBody extends Request{
    body: {
        [key: string]: string
    }
}

router.get('/', (req: Request, res: Response) => {
    res.send(`
        <html>
            <body>
                <form method="post" action="/getData">
                    <input type="password" name="password" />
                    <button>submit</button>
                </form>
            </body>
        </html>
    `)
})
router.post('/getData', (req: RequestWithBody, res: Response) => {
    if (req.body.password === '123') {
        const url = `https://yunp.top/app`;
        const analyzer = DellAnalyzer.getInstance()
        new Crawler(url, analyzer);
        
        res.send('getData Success!')

    } else {
        res.send(`${req.name} password error!`)
    }
})

export default router
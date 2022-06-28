import { Router,Request,Response } from 'express'
import Crawler from './crowller'
import DellAnalyzer from './dellAnalyzer'

const router  = Router();

router.get('/', (req: Request, res: Response) => {
    res.send('hello world')
})
router.get('/getData', (req: Request, res: Response) => {


const url = `https://yunp.top/app`;

const analyzer = DellAnalyzer.getInstance()
new Crawler(url, analyzer);

    res.send('getData Success!')
})

export default router
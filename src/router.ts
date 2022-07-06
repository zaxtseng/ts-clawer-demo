import { Router } from 'express'
// import Crawler from './utils/crowller'
// import DellAnalyzer from './utils/dellAnalyzer'
// import { getResponseData } from './utils/util'

// const router = Router();
// interface BodyRequest extends Request {
//     body: {
//         [key: string]: string
//     }
// }
// // 判断登录的中间件
// const checkLogin = (req: BodyRequest, res: Response, next: NextFunction) => {
//     const isLogin = req.session ? req.session.login : false;
//     if (isLogin) {
//         next()
//     } else {
//         res.json(getResponseData(null,"请先登录!"))
//     }
// }

// router.get('/', (req: Request, res: Response) => {
//     // 判断登录
//     const isLogin = req.session ? req.session.login : false
//     if (isLogin) {
//         res.send(`
//         <html>
//             <body>
//                 <a href="/getData">爬取内容</a>
//                 <a href="/showData">展示内容</a>
//                 <a href="/logout">退出</a>
//             </body>
//         </html>`)
//     } else {
//         res.send(`
//             <html>
//                 <body>
//                     <form method="post" action="/login">
//                         <input type="password" name="password" />
//                         <button>login</button>
//                     </form>
//                 </body>
//             </html>
//         `)

//     }
// })
// router.get('/getData', checkLogin, (req: BodyRequest, res: Response) => {
//     const url = `https://yunp.top/app`;
//     const analyzer = DellAnalyzer.getInstance()
//     new Crawler(url, analyzer);

//     res.send('getData Success!')
// })

// router.post('/login', (req: BodyRequest, res: Response) => {
//     const { password } = req.body;
//     const isLogin = req.session ? req.session.login : false;
//     if (isLogin) {
//         res.json(getResponseData(false,"already login!"))
//     } else {
//         if (password === '123' && req.session) {
//             req.session.login = true
//             res.json(getResponseData(true))
//         } else {
//             res.json(getResponseData(false,"login error"))
//         }
//     }
// })

// router.get("/logout", (req: BodyRequest, res: Response) => {
//     if (req.session) {
//         req.session.login = undefined;
//         res.json(getResponseData(true))
//     }
// })

// router.get("/showData", checkLogin, (req: BodyRequest, res: Response) => {
//     try {
//         const position = path.resolve(__dirname, '../data/course.json');
//         const result = fs.readFileSync(position, 'utf-8')
//         res.json(JSON.parse(result))
//     } catch (e) {
//         res.send('请登录后查看')
//     }
// })

export default Router()
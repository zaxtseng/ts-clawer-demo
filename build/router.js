"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const express_1 = require("express");
const crowller_1 = __importDefault(require("./utils/crowller"));
const dellAnalyzer_1 = __importDefault(require("./utils/dellAnalyzer"));
const util_1 = require("./utils/util");
const router = (0, express_1.Router)();
const checkLogin = (req, res, next) => {
    const isLogin = req.session ? req.session.login : false;
    if (isLogin) {
        next();
    }
    else {
        res.json((0, util_1.getResponseData)(null, "请先登录!"));
    }
};
router.get('/', (req, res) => {
    const isLogin = req.session ? req.session.login : false;
    if (isLogin) {
        res.send(`
        <html>
            <body>
                <a href="/getData">爬取内容</a>
                <a href="/showData">展示内容</a>
                <a href="/logout">退出</a>
            </body>
        </html>`);
    }
    else {
        res.send(`
            <html>
                <body>
                    <form method="post" action="/login">
                        <input type="password" name="password" />
                        <button>login</button>
                    </form>
                </body>
            </html>
        `);
    }
});
router.get('/getData', checkLogin, (req, res) => {
    const url = `https://yunp.top/app`;
    const analyzer = dellAnalyzer_1.default.getInstance();
    new crowller_1.default(url, analyzer);
    res.send('getData Success!');
});
router.post('/login', (req, res) => {
    const { password } = req.body;
    const isLogin = req.session ? req.session.login : false;
    if (isLogin) {
        res.json((0, util_1.getResponseData)(false, "already login!"));
    }
    else {
        if (password === '123' && req.session) {
            req.session.login = true;
            res.json((0, util_1.getResponseData)(true));
        }
        else {
            res.json((0, util_1.getResponseData)(false, "login error"));
        }
    }
});
router.get("/logout", (req, res) => {
    if (req.session) {
        req.session.login = undefined;
        res.json((0, util_1.getResponseData)(true));
    }
});
router.get("/showData", checkLogin, (req, res) => {
    try {
        const position = path_1.default.resolve(__dirname, '../data/course.json');
        const result = fs_1.default.readFileSync(position, 'utf-8');
        res.json(JSON.parse(result));
    }
    catch (e) {
        res.send('请登录后查看');
    }
});
exports.default = router;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const crowller_1 = __importDefault(require("./crowller"));
const dellAnalyzer_1 = __importDefault(require("./dellAnalyzer"));
const router = (0, express_1.Router)();
router.get('/', (req, res) => {
    res.send(`
        <html>
            <body>
                <form method="post" action="/getData">
                    <input type="password" name="password" />
                    <button>submit</button>
                </form>
            </body>
        </html>
    `);
});
router.post('/getData', (req, res) => {
    if (req.body.password === '123') {
        const url = `https://yunp.top/app`;
        const analyzer = dellAnalyzer_1.default.getInstance();
        new crowller_1.default(url, analyzer);
        res.send('getData Success!');
    }
    else {
        res.send(`${req.name} password error!`);
    }
});
exports.default = router;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 文件分析工具
 */
const cheerio_1 = __importDefault(require("cheerio"));
const fs_1 = __importDefault(require("fs"));
class DellAnalyzer {
    // 改成单例模式
    constructor() { }
    static getInstance() {
        if (!DellAnalyzer.instance) {
            DellAnalyzer.instance = new DellAnalyzer();
        }
        return DellAnalyzer.instance;
    }
    // 处理课程信息
    getJsonInfo(html) {
        const courseInfos = [];
        const $ = cheerio_1.default.load(html);
        const courseRow = $('.course-row');
        courseRow.map((index, element) => {
            const title = $(element).find('.font-weight-bold').eq(0).text();
            const price = $(element).find('.font-weight-bold').eq(1).text().replace(/[\s]/g, '');
            courseInfos.push({ title, price });
        });
        // console.log('courseInfos: ', courseInfos);
        return {
            time: new Date().getTime(),
            data: courseInfos
        };
    }
    // 存储课程信息
    generateJsonFile(courseInfo, filePath) {
        // 文件路径
        // const filePath = path.resolve(__dirname,'../data/course.json')
        let fileContent = {};
        // 写入文件,判断文件是否存在
        if (fs_1.default.existsSync(filePath)) {
            // 存在
            fileContent = JSON.parse(fs_1.default.readFileSync(filePath, 'utf-8'));
        }
        // 修改内容格式为键值对
        fileContent[courseInfo.time] = courseInfo.data;
        // 写入文件
        return fileContent;
    }
    analyze(html, filePath) {
        const courseResult = this.getJsonInfo(html);
        const fileContent = this.generateJsonFile(courseResult, filePath);
        return JSON.stringify(fileContent);
    }
}
exports.default = DellAnalyzer;

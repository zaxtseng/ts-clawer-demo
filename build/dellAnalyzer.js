"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cheerio_1 = __importDefault(require("cheerio"));
const fs_1 = __importDefault(require("fs"));
class DellAnalyzer {
    constructor() { }
    static getInstance() {
        if (!DellAnalyzer.instance) {
            DellAnalyzer.instance = new DellAnalyzer();
        }
        return DellAnalyzer.instance;
    }
    getJsonInfo(html) {
        const courseInfos = [];
        const $ = cheerio_1.default.load(html);
        const courseRow = $('.course-row');
        courseRow.map((index, element) => {
            const title = $(element).find('.font-weight-bold').eq(0).text();
            const price = $(element).find('.font-weight-bold').eq(1).text().replace(/[\s]/g, '');
            courseInfos.push({ title, price });
        });
        return {
            time: new Date().getTime(),
            data: courseInfos
        };
    }
    generateJsonFile(courseInfo, filePath) {
        let fileContent = {};
        if (fs_1.default.existsSync(filePath)) {
            fileContent = JSON.parse(fs_1.default.readFileSync(filePath, 'utf-8'));
        }
        fileContent[courseInfo.time] = courseInfo.data;
        return fileContent;
    }
    analyze(html, filePath) {
        const courseResult = this.getJsonInfo(html);
        const fileContent = this.generateJsonFile(courseResult, filePath);
        return JSON.stringify(fileContent);
    }
}
exports.default = DellAnalyzer;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var cheerio_1 = __importDefault(require("cheerio"));
var fs_1 = __importDefault(require("fs"));
var DellAnalyzer = (function () {
    function DellAnalyzer() {
    }
    DellAnalyzer.getInstance = function () {
        if (!DellAnalyzer.instance) {
            DellAnalyzer.instance = new DellAnalyzer();
        }
        return DellAnalyzer.instance;
    };
    DellAnalyzer.prototype.getJsonInfo = function (html) {
        var courseInfos = [];
        var $ = cheerio_1.default.load(html);
        var courseRow = $('.course-row');
        courseRow.map(function (index, element) {
            var title = $(element).find('.font-weight-bold').eq(0).text();
            var price = $(element).find('.font-weight-bold').eq(1).text().replace(/[\s]/g, '');
            courseInfos.push({ title: title, price: price });
        });
        return {
            time: new Date().getTime(),
            data: courseInfos
        };
    };
    DellAnalyzer.prototype.generateJsonFile = function (courseInfo, filePath) {
        var fileContent = {};
        if (fs_1.default.existsSync(filePath)) {
            fileContent = JSON.parse(fs_1.default.readFileSync(filePath, 'utf-8'));
        }
        fileContent[courseInfo.time] = courseInfo.data;
        return fileContent;
    };
    DellAnalyzer.prototype.analyze = function (html, filePath) {
        var courseResult = this.getJsonInfo(html);
        var fileContent = this.generateJsonFile(courseResult, filePath);
        return JSON.stringify(fileContent);
    };
    return DellAnalyzer;
}());
exports.default = DellAnalyzer;

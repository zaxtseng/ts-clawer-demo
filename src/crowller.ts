/**
 * 纯粹爬取工具类
 */
import superagent from 'superagent'
import fs from 'fs'
import path from 'path'
import DellAnalyzer from './dellAnalyzer'

export interface IAnalyzer {
    analyze: (html:string, filePath:string) => string
}
class Crawler {
    private filePath = path.resolve(__dirname,'../data/course.json')

    
    // 获取课程信息
    public async getRawHtml() {
        const result = await superagent.get(this.url)
        return result.text
    }
    
    // 写入文件
    public writeFile(filePath: string, data: string) {
        fs.writeFileSync(filePath, data)
    }
    // 启动爬虫
    public async initSpiderProcess() {
        const html = await this.getRawHtml()
        const fileContent = this.analyzer.analyze(html, this.filePath)
        // 存储课程信息
        this.writeFile(this.filePath, fileContent)
    }
    constructor(private url: string, private analyzer: IAnalyzer) {
        this.initSpiderProcess();
    }
}
const url = `https://yunp.top/app`;

const analyzer = new DellAnalyzer()
new Crawler(url, analyzer);
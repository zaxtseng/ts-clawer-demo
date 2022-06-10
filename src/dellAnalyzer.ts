/**
 * 文件分析工具
 */
import cheerio from 'cheerio'
import fs from 'fs'
import { IAnalyzer } from './crowller'

interface ICourse {
    title: string
    price: string
}
interface ICourseData {
    time: number
    data: ICourse[]
}
interface IFileContent {
    [key: number]: ICourse[]
}

class DellAnalyzer implements IAnalyzer {
    private static instance: DellAnalyzer
    static getInstance() {
        if (!DellAnalyzer.instance) {
            DellAnalyzer.instance = new DellAnalyzer()
        }
        return DellAnalyzer.instance
    }
    // 改成单例模式
    private constructor() { }
    // 处理课程信息
    private getJsonInfo(html: string) {
        const courseInfos: ICourse[] = []
        const $ = cheerio.load(html);
        const courseRow = $('.course-row');

        courseRow.map((index, element) => {
            const title = $(element).find('.font-weight-bold').eq(0).text()
            const price = $(element).find('.font-weight-bold').eq(1).text().replace(/[\s]/g, '')
            courseInfos.push({ title, price })
        })
        // console.log('courseInfos: ', courseInfos);
        return {
            time: new Date().getTime(),
            data: courseInfos
        }
    }

    // 存储课程信息
    generateJsonFile(courseInfo: ICourseData, filePath: string) {
        // 文件路径
        // const filePath = path.resolve(__dirname,'../data/course.json')
        let fileContent: IFileContent = {}
        // 写入文件,判断文件是否存在
        if (fs.existsSync(filePath)) {
            // 存在
            fileContent = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
        }
        // 修改内容格式为键值对
        fileContent[courseInfo.time] = courseInfo.data
        // 写入文件
        return fileContent
    }

    public analyze(html: string, filePath: string) {
        const courseResult = this.getJsonInfo(html)
        const fileContent = this.generateJsonFile(courseResult, filePath)
        return JSON.stringify(fileContent)
    }

}
export default DellAnalyzer
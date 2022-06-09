import superagent from 'superagent'
import cheerio from 'cheerio'
import fs from 'fs'
import path from 'path'

interface ICourse {
    title: string
    price: string
}
interface ICourseData {
    time: number
    data: ICourse[]
}
interface IfileContent {
    [key: number]: ICourse[]
}
class Crawler {
    private url = `https://yunp.top/app`;
    // 处理课程信息
    public getJsonInfo(html: string) {
        const courseInfos: ICourse[] = []
        const $ = cheerio.load(html);
        const courseRow = $('.course-row');

        courseRow.map((index, element) => {
            const title = $(element).find('.font-weight-bold').eq(0).text()
            const price = $(element).find('.font-weight-bold').eq(1).text().replace(/[\s]/g, '')
            courseInfos.push({title,price})
        })
        return {
            time: new Date().getTime(),
            data: courseInfos
        }
    }
    // 获取课程信息
    public async getRawHtml() {
        const result = await superagent.get(this.url)
        return result.text
    }
    // 存储课程信息
    generateJsonFile(courseInfo: ICourseData) {
        // 文件路径
        const filePath = path.resolve(__dirname,'../data/course.json')
        let fileContent: IfileContent = {}
        // 写入文件,判断文件是否存在
        if (fs.existsSync(filePath)) {
            // 存在
            fileContent = JSON.parse(fs.readFileSync(filePath, 'utf-8'))

            // 读取文件
            // const fileContent = fs.readFileSync(filePath, 'utf-8')
            // // 转换成对象
            // const fileData = JSON.parse(fileContent)
            // // 合并
            // const finalData = {
            //     time: courseInfo.time,
            //     data: [...fileData.data, ...courseInfo.data]
            // }
            // // 写入文件
            // fs.writeFileSync(filePath, JSON.stringify(finalData))
        }
        // 修改内容格式为键值对
        fileContent[courseInfo.time] = courseInfo.data
        // 写入文件
        fs.writeFileSync(filePath, JSON.stringify(fileContent))
    }
    // 启动爬虫
    public async initSpiderProcess() {
        const html = await this.getRawHtml()
        const courseResult = this.getJsonInfo(html)
        // 存储课程信息
        this.generateJsonFile(courseResult)
    }
    constructor() {
        this.initSpiderProcess();
    }
}

const crawler = new Crawler();
import superagent from 'superagent'
import cheerio from 'cheerio'

interface ICourse {
    title: string
    desc: string
    price: string
}
class Crawler {
    private url = `https://yunp.top/app`;

    public getJsonInfo(html: string) {
        const courseInfos: ICourse[] = []
        const $ = cheerio.load(html);
        const courseRow = $('.course-row');
        // console.log('courseRow: ', courseRow);
        courseRow.map((index, element) => {
            const title = $(element).find('.font-weight-bold').eq(0).text()
            const desc = $(element).find('.course-meta div').eq(1).text()
            const price = $(element).find('.font-weight-bold').eq(1).text().replace(/[\s]/g, '')
            courseInfos.push({title,desc,price})
        })
        const result = {
            time: new Date().getTime(),
            data: courseInfos
        }
        console.log(result);

    }

    public async getRawHtml() {
        const result = await superagent.get(this.url)
        // console.log('result: ', result.text);
        // this.rawHtml = result.text;
        this.getJsonInfo(result.text)
    }
    constructor() {
        this.getRawHtml();
    }
}

const crawler = new Crawler();
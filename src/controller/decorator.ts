import { Router, RequestHandler } from 'express'

export  const router = Router();

enum Method {
    get = 'get',
    post = 'post'
}
export function controller(target: any) {
    for(let key in target) {
        const path = Reflect.getMetadata('path', target.prototype, key)
        const method: Method = Reflect.getMetadata('method', target.prototype, key)
        const middleware = Reflect.getMetadata('middleware', target.prototype, key)
        const handler = target.prototype[key]
        if(path && method && handler) {
            if(middleware) {
                router[method](path, middleware, handler)
            }else{
                router[method](path, handler)
            }
        }        
    }
}
//中间件
export function use(middleware: RequestHandler) {
    return function(target: any, key: string) {
        Reflect.defineMetadata('middleware', middleware, target, key)
    }
}

//使用装饰器
function getRequestDecorator(type: string) {
    return function(path: string) {
    return function(target: any, key: string) {
        Reflect.defineMetadata('path', path, target, key)
        Reflect.defineMetadata('method', type, target, key)
        }
    }
}
export const get = getRequestDecorator('get')
export const post = getRequestDecorator('post')



import router from '../router'
import {RequestHandler} from 'express'
// export  const router = Router();

enum Methods {
    get = 'get',
    post = 'post'
}

export function controller(root: string) {
    return function controller(target: new (...args: any[]) => any) {
        for(let key in target) {
            const path:string = Reflect.getMetadata('path', target.prototype, key)
            const method: Methods = Reflect.getMetadata('method', target.prototype, key)
            const middleware:RequestHandler = Reflect.getMetadata('middleware', target.prototype, key)
            const handler = target.prototype[key]
            if(path && method && handler) {
                const fullPath = path === '/' ? path :`${root}${path}`
                if(middleware) {
                    router[method](fullPath, middleware, handler)
                }else{
                    router[method](fullPath, handler)
                }
            }        
        }
    }

}
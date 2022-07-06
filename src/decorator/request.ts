import { LoginController, CrowllerController } from '../controller'

enum Methods {
    get = 'get',
    post = 'post'
}
//使用装饰器
function getRequestDecorator(type: Methods) {
    return function(path: string) {
    return function(target: LoginController | CrowllerController, key: string) {
        Reflect.defineMetadata('path', path, target, key)
        Reflect.defineMetadata('method', type, target, key)
        }
    }
}
export const get = getRequestDecorator(Methods.get)
export const post = getRequestDecorator(Methods.post)
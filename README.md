# ts-clawer-demo
## main分支
为组合设计模式拆封

## simple分支
为单例模式
## express分支
包含express服务器   
对express解释文件的补充   
新建文件custom.d.ts,使用namespace融合到Request中.
对路由及请求使用装饰器.

### 完善登录功能
使用cookieSession中间件完善登录.
## 问题
编译没有报错,但是页面404  
### 原因
使用for...in遍历原型上的方法,es6中原型上的方法无法枚举.
### 解决方法
tsconfig.json文件中改为`target:es5`即可.
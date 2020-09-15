let baseUrl = "";
switch (process.env.NODE_ENV) { //注意变量名是自定义的
    case 'dev':
        baseUrl = "http://localhost:8092/"  //开发环境url
        break
    case 'serve':
        baseUrl = "http://localhost:8092/"   //生产环境url
        break
}

export default baseUrl;
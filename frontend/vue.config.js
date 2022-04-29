const path = require('path')

module.exports = {
    outputDir : path.resolve(__dirname, '../backend/public'), // f->b백엔드로 내보낸다
    devServer : {
        '/api' : {
            target : 'http://localhost:3000/api',
            changeOrigin : true,
            pathRewrite : {
                '^api' : ''
            }
        }
    }
}
// 복붙해서 써도됨
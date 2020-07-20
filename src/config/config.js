module.exports = {
    port: process.env.port || 4000,
    database: {
        db: "task",
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: 'password'
    },
    token: {
        tokenExpireTime: 10 * 60, //50 * 60,// 50 min
        refreshTokenExpireTime: 3 * 24 * 60 * 60, // 3d
        tokenSecret: "tokenSecret",
        refreshTokenSecret: "refreshTokenSecret",
    }
}

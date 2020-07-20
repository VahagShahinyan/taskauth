# Requirements

| Technology name | version |
| ------ | ------ |
| Nodejs | 12.x.x+ |
| Mysql | 5.3.2+ |

# Installation

```sh
$ npm install 
```

# Config
please create database in mysql and configure config.js file : ./config/config.js
```sh
{
    port: process.env.port || 4000,
    database: {
        db: "task",
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: 'password'
    },
    token: {
        tokenExpireTime: 10 * 60, // (10 min)
        refreshTokenExpireTime: 3 * 24 * 60 * 60, // (3 day)
        tokenSecret: "tokenSecret",
        refreshTokenSecret: "refreshTokenSecret",
    }
}

```


# Start

```sh
$ npm start 
$ npm run dev 
```


# Postmen Collection file  
```
File path: ./postman_collection.json
```
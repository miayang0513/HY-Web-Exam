# HY Web-Exam API
前端考題 API

## # Node 版本
Node 14以上 均可正常

開發時用 Node 16.20.0

## # 使用方式

```javascript
npm i && npm run start
```
API 服務
http://localhost:3000/

API 文件
http://localhost:3000/docs

## # 系統預設是 localhost:3000
可自行修改
```javascript
// setting.js

// 設定 server
module.exports = {
  setting_host: 'localhost',
  setting_port: 3000,
}
```
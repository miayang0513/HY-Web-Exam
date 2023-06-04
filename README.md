# HY Web Exam

### Node 版本

```sh
v18.15.0
```

### 如何啟動專案

##### 1. 下載專案套件

```sh
npm i
```

##### 2. 設定環境變數

新增 `.env` 檔，並設定 `VITE_APP_API_ENDPOINT`

```sh
// .env
VITE_APP_API_ENDPOINT=http:your_ip:your_port
```

##### 3. 啟動專案

```sh
npm run dev
```

### 功能

| Feaurte                                                                        | PC Chrome |                     PC Safari                     | Mobile Chrome | Mobile Safari |
| ------------------------------------------------------------------------------ | :-------: | :-----------------------------------------------: | :-----------: | :-----------: |
| Play & Pause video                                                             |     ✓     |                         ✓                         |       ✓       |       ✓       |
| Unmute                                                                         |     ✓     |                         ✓                         |       ✓       |       ✓       |
| Swipe to switch video                                                          |     ✓     | x<br>(電腦版 Safari 的 RWD Mode 無法模擬觸控行為) |       ✓       |       ✓       |
| Transition cover between switching videos                                      |     ✓     | x<br>(電腦版 Safari 的 RWD Mode 無法模擬觸控行為) |       ✓       |       ✓       |
| Adjust progress of video by user                                               |     ✓     |                         ✓                         |       ✓       |       ✓       |
| Switch the pages between `following` and `for you`, and keep the same progress |     ✓     |                         ✓                         |       ✓       |       ✓       |
| Show title crawl                                                               |     ✓     |                         ✓                         |       ✓       |       ✓       |
| (額外) Share to social media (Twitter & Whatsapp)                              |     ✓     |                         ✓                         |       ✓       |       ✓       |
| (額外) Copy share link                                                         |     ✓     |                         ✓                         |       ✓       |       ✓       |

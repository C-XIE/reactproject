import dva from 'dva';
import createLogger from 'dva-logger';

import createHistory from 'history/createHashHistory';

import { message } from 'antd';
// import router from './routes/publishRouter.js';
import router from './router.js';

const ERROR_MSG_DURATION = 3; // 3 秒

const app = dva({
    history: createHistory(),
    onError(e) {
        message.error(e.message, ERROR_MSG_DURATION);
    },
});
//初始化
// const app = dva();
app.use(createLogger());

//model移动到 router.js
// app.model(pushModel);


app.router(router);

//挂载点
app.start("#app");

//bug1 Tagctrl.js  关掉前一个tag，会关闭两个
//bug2  关闭tag  选择框不会同时自动关掉
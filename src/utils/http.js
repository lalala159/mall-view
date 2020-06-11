import axios from "axios";
// 请求错误时提示，根据需求引入不同ui
import { Message } from 'element-ui';

import { Loading } from 'element-ui';


const service = axios.create({
//   headers: {'X-Requested-With': 'XMLHttpRequest'}, // 可以配置headers
    baseURL: "http://localhost:9527", // api的base_url
    timeout: 10000 // request timeout，默认0
});

let loading        //定义loading变量

function startLoading() {    //使用Element loading-start 方法
    loading = Loading.service({
        lock: true,
        text: '加载中……',
        background: 'rgba(0, 0, 0, 0.7)'
    })
}
function endLoading() {    //使用Element loading-close 方法
    loading.close()
}
//那么 showFullScreenLoading() tryHideFullScreenLoading() 要干的事儿就是将同一时刻的请求合并。
//声明一个变量 needLoadingRequestCount，每次调用showFullScreenLoading方法 needLoadingRequestCount + 1。
//调用tryHideFullScreenLoading()方法，needLoadingRequestCount - 1。needLoadingRequestCount为 0 时，结束 loading。
let needLoadingRequestCount = 0
export function showFullScreenLoading() {
    if (needLoadingRequestCount === 0) {
        startLoading()
    }
    needLoadingRequestCount++
}

export function tryHideFullScreenLoading() {
    if (needLoadingRequestCount <= 0) return
    needLoadingRequestCount--
    if (needLoadingRequestCount === 0) {
        endLoading()
    }
}

// 添加一个请求拦截器
service.interceptors.request.use(
    (config)=> {
        const token = window.localStorage.getItem('access_token');
        if(token != null){
            config.headers['Authorization']= 'Bearer '+token
        }
        showFullScreenLoading()
        return config;
    },
    function(error) {
        // Do something with request error
        tryHideFullScreenLoading()
        return Promise.reject(error);
    }
);

// 添加一个响应拦截器
service.interceptors.response.use(
    (response)=> {
            tryHideFullScreenLoading()
            return response.data;
    },
    (error)=> {
        tryHideFullScreenLoading()
        return Promise.reject(error);
    }
);

export default service
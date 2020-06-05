import axios from "axios";
// 请求错误时提示，根据需求引入不同ui
import { Message } from 'element-ui';


const service = axios.create({
//   headers: {'X-Requested-With': 'XMLHttpRequest'}, // 可以配置headers
    baseURL: "http://localhost:9527", // api的base_url
    timeout: 10000 // request timeout，默认0
});
// 请求头的设置
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

// 添加一个请求拦截器
service.interceptors.request.use(
    (config)=> {
        const token = window.localStorage.getItem('access_token');
        if(token != null){
            config.headers['Authorization']= 'Bearer '+token
        }
        return config;
    },
    function(error) {
        // Do something with request error
        return Promise.reject(error);
    }
);

// 添加一个响应拦截器
service.interceptors.response.use(
    (response)=> {
            return response.data;
    },
    (error)=> {
        // Do something with response error
        // 提示错误信息
        Message.error('请求失败');
        return Promise.reject(error);
    }
);

export default service
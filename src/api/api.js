// api.js
import request from "../utils/http";

import qs from 'qs'


export function getToken(val) {
    return request({
        url: "/auth/oauth/token", // 接口
        method: "post", // 请求方式
        data: qs.stringify(val), // 数据
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    });
}

export function twoApi(val) {
    return request({
        url: "", // 接口
        method: "post", // 请求方式
        data: val, // 数据
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    });
}
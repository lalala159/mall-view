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

export function getMember(val) {
    const token = window.localStorage.getItem('access_token');
    return request({
        url: "/auth/api/member", // 接口
        method: "get", // 请求方式
        data: val, // 数据
        headers: {
            "Authorization": 'Bearer '+token
        }
    });
}

export function queryList(val) {
    return request({
        url: val.url, // 接口
        method: "POST", // 请求方式
        data: qs.stringify(val.params), // 数据
    });
}

export function addUser(val) {
    return request({
        url: val.url, // 接口
        method: "POST", // 请求方式
        data: qs.stringify(val.params), // 数据
    });
}
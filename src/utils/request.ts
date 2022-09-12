import axios from "axios"
import config from './config'
import { getCookie, removeCookie, setCookie } from './auth'

const service = axios.create({
    baseURL: config.BASE_URL,
    timeout: 30000,
    headers: {
        "Content-Type": "application/json; charset=utf-8",
    },
    withCredentials: true // 自动获取cookie
})

// request 拦截器 发送数据到后台服务器前拦截
service.interceptors.request.use(
    (config: any) => {
        if (getCookie("__token__")) {
            config.headers.Authorization = "Authorization " + getCookie("Token")
        }
        return config;
    },
    (error: any) => {
        Promise.reject(error);
    }
)

// 是否正在刷新的标记
let isRefreshing = false;
//重试队列
let requests: any[] = []

// response  拦截器 获取后台数据前拦截
service.interceptors.response.use(
    (response: any) => {
        // 未设置状态码则默认成功状态
        const code = response.data.code || 2000;

        // 无感刷新token
        // if (code === 401) {
        //     if (!isRefreshing) {
        //         if (!getCookie("__token__") || getCookie("__refresh")) return;
        //         isRefreshing = true;
        //         removeCookie('__token__');
        //         //调用刷新token的接口
        //         return refreshToken({ refresh: getCookie("__refresh") }).then((res: any) => {
        //             if (res.code === 4001) {
        //                 removeCookie('__token__');
        //                 window.location.href = "/login"
        //                 return;
        //             }
        //             const { access: token, refresh } = res;
        //             setCookie("__token__", token)
        //             setCookie("__refresh", refresh)
        //             response.headers.Authorization = `Authorization ${token}`
        //             // token 刷新后将数组的方法重新执行
        //             requests.forEach((cb) => cb(token))
        //             requests = [] // 重新请求完清空
        //             return service(response.config)
        //         }).catch((err: any) => {
        //             //跳到登录页
        //             removeCookie('__token__');
        //             // console.log("错误", err);
        //             window.location.href = "/login"
        //             return Promise.reject(err)
        //         }).finally(() => {
        //             isRefreshing = false;
        //         })
        //     } else {
        //         // 返回未执行 resolve 的 Promise
        //         return new Promise(resolve => {
        //             // 用函数形式将 resolve 存入，等待刷新后再执行
        //             requests.push((token: any) => {
        //                 response.headers.Authorization = `${token}`
        //                 resolve(service(response.config))
        //             })
        //         })
        //     }
        // }


        return response.data;
    },
    (error: any) => {
        let { message } = error;

        if (message === "Network Error") {
            message = "连接异常";
        } else if (message.includes("timeout")) {
            message = "请求超时";
        } else if (message.includes("Request failed with status code")) {
            message = "系统" + message.substr(message.length - 3) + "异常";
        }
        console.log("error=>", message);

        return Promise.reject(error);
    }
)

export default service;
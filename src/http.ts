//可以自己封装axios，增加更多内容
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { ElLoading } from 'element-plus';

interface Options {
    lock: boolean;
    text: string;
    background: string;
}
let loading: any;
const startLoading = () => {
    const options = <Options>{
        lock: true,
        text: "loading...",
        background: 'rgba(0,0,0,0.7)'
    }
    loading = ElLoading.service(options);
}
const endLoading = () => {
    loading.close();
}
//请求拦截
axios.interceptors.request.use((config: AxiosRequestConfig) => {
    startLoading();
    return config;
})
//响应拦截
axios.interceptors.response.use((response: AxiosResponse) => {
    endLoading();
    return response;
}, error => {
    endLoading();
    return Promise.reject(error);
})
export default axios;
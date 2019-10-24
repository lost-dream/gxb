import axios from 'axios';
import Cookie from 'js-cookie';

const requset = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 30000,
  headers: {
    contentType: 'application/json;charset=utf-8'
  }
});

requset.interceptors.request.use(
  config => {
    let access_token = Cookie.get('ac_token');
    let Authorization = Cookie.get('auth_token')
      ? Cookie.get('auth_token')
      : null;

    config.headers['access_token'] = access_token;
    if (Authorization) {
      config.headers['Authorization'] = Authorization;
    } else {
      config.headers['Authorization'] = null;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

requset.interceptors.response.use(response => {
  if (response.constructormothod !== 'options' && response) {
    // 拦截请求操作
  }

  return response;
});

export default requset;

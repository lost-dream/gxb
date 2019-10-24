import request from '@/utils/request';
import getToken from '@/utils/auth/getBasicToken';

export function getAccessToken() {
  return request({
    url: 'access_token',
    method: 'post',
    data: getToken()
  });
}

export function getBanner(data) {
  return request({
    url: 'banners',
    method: 'get',
    data: data
  });
}

export function getNotice(data) {
  return request({
    url: 'pcredit_actions',
    method: 'get',
    data: data
  });
}

export function getRecommend(data) {
  return request({
    url: 'loans',
    method: 'get',
    params: data
  });
}

import { IreqConfig, Iresult } from './utils.d';
import axios from 'axios';

const reqConfig: IreqConfig = {
  credentials: 'include',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json; charset=utf-8',
  },
};

/**
 * 请求
 *
 * @param {string} url 接口文档上的url地址
 * @param {*} reqData 请求数据
 */
function post(url: string, reqData: object, config: IreqConfig = reqConfig) {
  return axios
    .post(url, reqData, config)
    .then(response => response.data)
    .then(result => {
      return result;
    })
    .then((res: Iresult) => {
      return res;
    })
    .catch(error => {
      throw new Error(error);
    });
}

function get(url: string): object {
  return axios({
    method: 'get',
    url,
  })
    .then(response => response.data)
    .then(result => {
      return result;
    })
    .then((res: Iresult) => {
      return res;
    })
    .catch(error => {
      throw new Error(error);
    });
}

export function requestForm(
  url: string,
  reqData: any,
  config = {
    mimetype: 'multipart/form-data',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  },
) {
  const form = new FormData();
  Object.keys(reqData).forEach(item => {
    form.append(item, reqData[item]);
  });
  return axios
    .post(url, form, config)
    .then(response => response.data)
    .then((result: Iresult) => {
      return result;
    })
    .catch(error => {
      throw new Error(error);
    });
}

export default { post, get, requestForm };

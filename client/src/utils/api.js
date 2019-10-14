import axios from 'axios';

export function apiCall(method, path, data, cfg=null) {
  return new Promise((resolve, reject) => {
    return axios[method.toLowerCase()](`${process.env.REACT_APP_API_URL}/api/${path}`, data, cfg)
      .then(res => {
        return resolve(res.data);
      })
      .catch(err => {
        return reject(err);
      });
  });
}
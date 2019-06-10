import axios from 'axios';

export function apiCall(method, path, data, cfg=null) {
  return new Promise((resolve, reject) => {
    return axios[method.toLowerCase()](`http://localhost:8000/api/${path}`, data, cfg)
      .then(res => {
        return resolve(res.data);
      })
      .catch(err => {
        return reject(err.response.data.error);
      });
  });
}
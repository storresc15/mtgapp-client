import axios from 'axios';

export function setTokenHeader(token) {
  if (token) {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
}

export function apiCall(method, path, data) {
  let envPath = path;

  if (process.env.NODE_ENV == 'development') {
    envPath = path.replace('/api', '');
  }

  let config = {
    headers: {
      'Content-Type': 'application/json'
    },
    withCredentials: true
  };
  return new Promise((resolve, reject) => {
    return axios[method](envPath, data, config)
      .then((res) => {
        return resolve(res.data);
      })
      .catch((err) => {
        //If error 401 unauth then send Session Expired error message
        if (err.response.status == 401) {
          return reject('Session Expired');
        }
        return reject(err.response.data.error);
      });
  });
}

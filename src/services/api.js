import axios from 'axios';

export function setTokenHeader(token) {
  if (token) {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
}

export function apiCall(method, path, data) {
  console.log('The Method: ' + method);
  console.log('The Path: ' + path);
  console.log('The Data: ' + data);

  let envPath = path;

  if (process.env.NODE_ENV == 'development') {
    envPath = path.replace('/api', '');
  }
  console.log('The new Path: ' + envPath);
  console.log('----The environment: ' + process.env.NODE_ENV);

  //Our own code to test config TO BE DELETED OR UPDATED
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
        return reject(err.response.data.error);
      });
  });
}

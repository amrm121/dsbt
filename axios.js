const axios = require('axios');

// Make a request for a user with a given ID
axios.create({
  baseURL: 'https://api.mercadopago.com',
});
 

//instance.defaults.headers.common['Authorization'] = AUTH_TOKEN;


// Want to use async/await? Add the `async` keyword to your outer function/method.
async function getUser() {
  try {
    const response = await axios.get('/v1/payments?access_token=TEST-1313730632078117-090411-229081d81388a1f5f2e601c7d75f9aa7-465684785');
    console.log(response);
  } catch (error) {
    console.error(error);
  }
}

/*
async function makePostRequest() {

    let res = await axios.post('https://jsonplaceholder.typicode.com/posts');

    console.log(`Status code: ${res.status}`);
    console.log(`Status text: ${res.statusText}`);
    console.log(`Request method: ${res.request.method}`);
    console.log(`Path: ${res.request.path}`);
    console.log(`Date: ${res.headers.date}`);
    console.log(`Data: ${res.data}`);
}

makePostRequest();

// Add a request interceptor
axios.interceptors.request.use(function (getUser) {
	console.log("USERGET AXIOS JS")
    // Do something before request is sent
    return getUser;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

// Add a response interceptor
axios.interceptors.response.use(function (response) {
    // Do something with response data
    return response;
  }, function (error) {
    // Do something with response error
    return Promise.reject(error);
  });*/


module.exports = axios;

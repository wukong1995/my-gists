// ajax提供的Promise callbacks: .done(), .fail(), .always(), and .then() — are invoked, in the order they are registered.
// 现在浏览器新出一个fetch的api
// 将ajax改成promise，就和fetch保持统一

const $ = require('jquery');

const request = (url) => {
  return new Promise((resolve, reject) => {
    $.ajax({
      url
    }).done((res) => {
      resolve(res);
    }).fail(error => {
      // 可以做统一的处理错误
      reject(error);
    });
  });
};

request()
  .then(res => {
    console.log('success');
  }).catch(error => {
    console.log('error');
  }).then(() => {
    console.log('complete');
  });

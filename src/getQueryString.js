// 方法 1：https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLAnchorElement

let dom;

function getQueryString1(url, name = '') {
  if (!url) {
    return undefined;
  }

  if (!dom) {
    dom = document.createElement('a');
  }

  dom.href = url;

  const search = dom.search.substring(1);
  const splitArr = search.split('&');
  const result = {};

  for (let i = 0; i < splitArr.length; i++) {
    let [key, value] = splitArr[i].split('=');

    value = decodeURIComponent(value);

    if (key in result) {
      result[key] = Array.isArray(result[key]) ? result[key].concat(value) : [...result[key], value];
    } else {
      result[key] = value;
    }
  }

  return name ? result[name] : result;
}

// 方法 2：https://developer.mozilla.org/zh-CN/docs/Web/API/URL

function getQueryString2(url, name = '') {
  if (!url) {
    return undefined;
  }

  const newUrl = new URL(url);
  const search = newUrl.search.substring(1);

  const splitArr = search.split('&');
  const result = {};

  for (let i = 0; i < splitArr.length; i++) {
    let [key, value] = splitArr[i].split('=');

    value = decodeURIComponent(value);

    if (key in result) {
      result[key] = Array.isArray(result[key]) ? result[key].concat(value) : [...result[key], value];
    } else {
      result[key] = value;
    }
  }

  return name ? result[name] : result;
}

const url1 = 'https://www.baidu.com/?id=100&name=AA&age=23&address=中国';
const url2 = 'https://www.baidu.com/?id=100&name=AA&age=23&id=101&id=102';

console.log(getQueryString1(url1));
console.log(getQueryString1(url1, 'id'));
console.log(getQueryString1(url1, 'address'));

console.log(getQueryString1(url2));
console.log(getQueryString1(url2, 'id'));

console.log(getQueryString2(url1));
console.log(getQueryString2(url1, 'id'));
console.log(getQueryString2(url1, 'address'));

console.log(getQueryString2(url2));
console.log(getQueryString2(url2, 'id'));

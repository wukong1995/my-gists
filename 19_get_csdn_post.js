// 迁移csdn上的博客

const https = require('https')
const cheerio = require('cheerio')
const fs = require('fs')

// cycle: get all articles url
// cycle: get article content(data, html to md)
//        create file
//        write file

function getUrlHtml(url, cb) {
  return new Promise(function(resolve, reject) {
    https
      .get(url, function(res) {
        let html = ''
        res
          .on('data', function(data) {
            html += data
          })
          .on('end', function() {
            resolve(cb(html))
          })
      })
      .on('error', function(err) {
        reject(err)
      })
  })
}

function getArticleUrl(html) {
  const $ = cheerio.load(html)
  const $articleList = $('.article-item-box.csdn-tracking-statistics h4 a')
  const articleUrlList = []

  $articleList.each(function(index, item) {
    articleUrlList.push($(item).attr('href'))

  })
  return articleUrlList
}


function createContentPromise(list) {
  console.log('createContentPromise')
  const promiseArr = []
  list.forEach((item) => {
    list.forEach((url) => {
      promiseArr.push(getUrlHtml(url, getArticleContent))
    })
  })
  Promise.all(promiseArr)
}

async function getArticleContent(html) {
  console.log('getArticleContent')
  const $ = cheerio.load(html)
  const title = $('.title-article').text()
  const time = $('.time').text().replace('年', '-').replace('月', '-').replace('日', '')
  const content = $('#content_views').text()
  await writeContentToFileAsync(title, time, content)
}

function writeContentToFileAsync(title, time, content) {
  return new Promise(function (resolve, reject) {
    // 可能会有更好的方法去format内容
    const md = `
      ---
        title: title
        date: ${time}
        articleTitle: ${title}
        tags: ['']
        categories: ['']
        description:
      ---
      ${content}
    `;


    fs.writeFile(`./post/${title}.md`, md, 'utf8', function (error, result) {
      if (error) {
        console.log(error)
        reject(error)
      } else {
        resolve(result)
      }
    })
  })
}


let funcArr = []
for(let i = 1; i <= 4; i++) {
  let url = `https://blog.csdn.net/u013742084/article/list/${i}`
  funcArr.push(getUrlHtml(url, getArticleUrl))
}

Promise
  .all(funcArr)
  .then(res => {
    res.forEach(list =>  {
     createContentPromise(list)
    })
  })
  .catch(err => {
    console.log(err)
    console.log("出错了")
  })

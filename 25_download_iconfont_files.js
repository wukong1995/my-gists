const { readFileSync, existsSync, createWriteStream, renameSync } = require('fs')
const http = require('http')
const { resolve: resolvePath } = require('path')

const tasks = {
  filePath: 'src/shared/App/iconfont.css',
  fileNameReg: /(?<=t\/)(.+?)(?=\?)/g,
  searchContent: /http(s)?:\/\/at\.alicdn\.com\/t/g,
  targetContent: '/new_iconfont'
}

const content = readFileSync(tasks.filePath)
const fileNames = content.match(task.fileNameReg)
if (!fileNames) return

// download file
await downloadFiles([...new Set(fileNames)])
// rename import file name
const newContent = content.replace(task.searchContent, task.targetContent)

writeFileSync(tasks.filePath, newContent, 'utf8')

function downloadFiles(fileNames) {
  return Promise.all([
    ...fileNames.map((fileName) => {
      return new Promise(function (resolve, reject) {
        const isExist = existsSync('static/new_iconfont/' + fileName)
        if (isExist) {
          resolve(filePath, '文件已经存在，不用下载')
          return
        }

        const tempFile = createWriteStream(`static/new_iconfont/temp_${fileName}`)
        tempFile.on('open', function () {
          http.get(`http://at.alicdn.com/t/${fileName}`, function (res) {
            res.on('data', function (chunk) {
              tempFile.write(chunk);
            }).on('end', function () {
              tempFile.end();
              renameSync(tempFile.path, 'static/new_iconfont/' + fileName);
              resolve(`${fileName} 下载成功`);
            }).on('error', function(error) {
              reject(`${fileName} 下载失败，原因：${error}`);
            })
          });
        })
      })
    })
  ])
}




// get all pacakges from common_package
const { packages } = require('../common_package')
const colors = require('colors')

console.log(colors.red('开始请运行: yarn add gulp gulp-download-stream gulp-concat gulp-rev del --dev'))
console.log(colors.red('完成后请运行: yarn remove gulp gulp-download-stream gulp-concat gulp-rev del'))

const gulp = require('gulp')
const download = require("gulp-download-stream")
const concat = require('gulp-concat')
const rev = require('gulp-rev')
const del = require('del')

const urls = []
const filesPath = []
const externals = {}
packages.forEach(item => {
  const { src, name, alias } = item
  urls.push(src)
  const temp = src.split('/')
  filesPath.push('static/temp_download/' + temp[temp.length - 1])
  // externals[name] = alias
})

download(urls)
  .pipe(gulp.dest("static/temp_download/"))
  .on('end', () => {
    gulp.src(filesPath)
      .pipe(concat({ path: 'common_vendor.js', cwd: '' }))
      .pipe(rev())
      .pipe(gulp.dest('static/vendor'))
      .on('end', () => {
        del('static/temp_download/')
        console.log('生成成功！')
      })
      .on('error', (error) => console.log('生成文件失败', error))
  })
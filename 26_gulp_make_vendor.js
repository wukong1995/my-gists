// 使用gulp打包node_modules里面的包

// get all pacakges from common_package
const { packages, utilPackages } = require('../common_package')

const gulp = require('gulp')
const buffer = require('gulp-buffer')
const uglify = require('gulp-uglify')
const rename = require('gulp-rename')
const sourcemaps = require('gulp-sourcemaps')
const source = require('vinyl-source-stream')
const rev = require('gulp-rev')
const browserify = require('browserify')
const nodeResolve = require('resolve')

const b = browserify({ debug: true })
Object.keys(packages).forEach(key => {
  b.require(nodeResolve.sync(key, { expose: key.replace(/-/g, '') }))
})

console.log('开始生成...')
b.bundle()
  .on('error', (error) => console.log('browserify bundle失败', error))
  .pipe(source('common_vendor.js'))
  .pipe(buffer())
  .pipe(rev())
  .pipe(gulp.dest('static/vendor'))
  .pipe(sourcemaps.init())
  .pipe(uglify())
  .pipe(rename(function(fileConf) {
    const newBasename = `${fileConf.basename}.min`
    console.log(`--文件名为${newBasename}.js`)
    fileConf.basename = newBasename
    returnfileConf
  }))
  .pipe(sourcemaps.write('./'))
  .pipe(gulp.dest('static/vendor'))
  .on('end', () => { console.log('生成成功！')})
  .on('error', (error) => console.log('生成文件失败', error))



// 查找含有js的文件夹
const path = require('path');
const fs = require('fs');
const rootPath = __filename;

// get params(最好是从命令行获得)
const dir = path.dirname(rootPath) + '/../XXX';
const include_folder = new Set();


function findInInner(_dir, filepath) {
  fs.stat(filepath, function(err, stats) {
    if (err) {
      console.log(err);
      return;
    }

    if(stats.isFile()) {
      if (/\.(js|jsx)/.test(filepath)) {
        include_folder.add(_dir);
      }
    } else {
      findFolder(filepath);
    }
  });
}

async function findFolder(_dir) {
  fs.readdir(_dir, function(err, files) {
    files.forEach(file => {
      if (/node_modules/.test(file)) return;
      findInInner(_dir, `${_dir}/${file}`);
    });
  });
}

await findFolder();
console.log(include_folder)

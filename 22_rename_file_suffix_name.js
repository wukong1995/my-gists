const fs = require('fs');
const tsFileReg = /(style|styles|data|util|type|reducer|action|gql|index).js$/

const dfs = (path) => {
  fs.readdir(path, function (error, files) {
    if (error) {
      console.log(error);
    } else {
      files.forEach((filename) => {
        const currentPath = path + filename;
        const stats = fs.statSync(currentPath);
        if (stats.isDirectory()) {
          dfs(currentPath + '/');
        } else {
          let newSuffix = tsFileReg.test(filename) ? '.ts' : '.tsx'
          const newFileName = filename.replace(/\.js$/, newSuffix);

          fs.rename(currentPath, `${path}${newFileName}`, function (err) {
            if (err) throw err;
            console.log('renamed complete');
          });
        }
      });
    }
  });
}

dfs('./src/shared/');



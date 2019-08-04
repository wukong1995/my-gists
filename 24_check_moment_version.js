const { readFileSync } = require('fs')
const antdPath = 'node_modules/antd/package.json'
const projectPath = 'package.json'

try {
  const momentVersionInAntd = getMomentVersion(readFileSync(antdPath));
  const momentVersionInProject = getMomentVersion(readFileSync(projectPath));
  if (momentVersionInAntd === momentVersionInProject) {
    console.log(`moment的版本一致, 版本号是${momentVersionInAntd}`)
  } else {
    console.log(`版本不一致，antd的版本是${momentVersionInAntd}，项目中的版本是${momentVersionInProject}，请查看changelog以统一版本`)
  }

} catch (err) {
  console.log('---出现错误,原因:', err)
}

function getMomentVersion(content) {
  return JSON.parse(content).dependencies.moment
}

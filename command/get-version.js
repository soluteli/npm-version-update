const path = require('path')
const askVersion = require('./pick-version').askVersion
const basePath = process.cwd()

let resolve = (dir = '.') => path.posix.join(basePath, dir, 'package.json')
let pkgInfo = require(resolve())


let toPickList = [
  {
    name: 'test-1',
    version: '0.0.1',
  },
  {
    name: 'test-2',
    version: '0.0.2',
  }
]

async function collectNextVersions () {
  let diffMap = {}
  for (let pkgInfo of toPickList) {
    let {name, version: cur} = pkgInfo
    diffMap[name] = {}
    diffMap[name]['pkg'] = pkgInfo
    diffMap[name]['cur'] = cur
    let ret = await askVersion(pkgInfo)
    diffMap[name]['next'] = ret.version
  }
  return diffMap
}

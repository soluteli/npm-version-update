const path = require('path')
const glob = require('glob')
const pickVersion = require('./pick-version')
const util = require('util')
const globAsync = util.promisify(glob)

const basePath = process.cwd()
let resolve = (dir = '.') => path.posix.join(basePath, dir)

async function getPickList(dir = '.') {
  let pattern = dir === '.' ? 'package.json' : `${dir}/**/package.json`
  let filesArr = await globAsync(pattern, {
    ignore: `**/node_modules/**/package.json`
  })
  let toPickList = filesArr.map((iii) => {
    let filePath = resolve(iii)
    return {
      pkg: require(filePath),
      filePath
    }
  })
  return toPickList
}

async function getVersions(dir) {
  let diffMap = []
  let toPickList = await getPickList(dir)
  for (let item of toPickList) {
    let { version: cur } = item.pkg
    item['cur'] = cur
    let ret = await pickVersion(item.pkg)
    item['next'] = ret.version
    diffMap.push(item)
  }
  return diffMap
}

module.exports = getVersions

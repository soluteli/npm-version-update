const gitAdd = require('../git/git-add')
const gitCommit = require('../git/git-commit')
const gitTag = require('../git/git-tag')
const gitPush = require('../git/git-push')

const cwd = process.cwd()
let opts = {cwd}


async function start (res) {
  let files = res.map(item => item.filePath)
  await gitAdd(files, opts)
  for (let item of res) {
    let {next, pkg: {name}} = item
    let tag = `${name}@${next}`
    await gitCommit(`add tag : ${tag}`, { }, opts)
    await gitTag(tag, {}, opts)
  }
  await gitPush('origin', 'master', opts)
}

module.exports = start


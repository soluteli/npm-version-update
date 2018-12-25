const inquirer = require("inquirer");
const getVersions = require('./get-version')
const updateVersion = require('./update-version')
const git = require('./git')

/**
 * 
 * @param {*} path 默认为 '.' 相对根目录的地址
 */
function npmVersionUpdate(path) {
  getVersions(path)
  .then(res => {
    let msg = 'Changes: \n'
    res.forEach((item) => {
      let { cur, next, pkg: {name} } = item
      msg += `-  ${name}:  ${cur} => ${next}`
    })
    return inquirer
      .prompt([
        {
          type: "confirm",
          name: "version",
          message: msg,
        }
      ])
      .then(answer => {
        if(answer.version) {
          return updateVersion(res)
        } else {
          process.exit(1)
        }
      })
      .then(() => {
        return git(res)
      })
      .then(res => {
        console.log('success')
      })
      .catch(err => {
        console.error(err)
      })
  }) 
}

npmVersionUpdate()
const util = require('util');
const fs = require('fs');

const writeFile = util.promisify(fs.writeFile);

function updateVersion (dataArr) {
  let promises = dataArr.map(data => {
    let { next, pkg, filePath } = data
    let nextPkg = {...pkg, version: next}
    data.pkg= nextPkg
    return writeFile(filePath, JSON.stringify(data.pkg, null, 2))
  })
  
  return Promise.all(promises)
}

module.exports = updateVersion

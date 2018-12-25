const isAnythingCommitted = require('../git/is-anything-committed')
let opts = {
  cwd: process.cwd()
}
let a = isAnythingCommitted(opts)
console.log(a)
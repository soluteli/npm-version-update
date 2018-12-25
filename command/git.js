const isAnythingCommitted = require('../git/is-anything-committed')
let opts = {
  cwd: process.cwd()
}

// 
let is_AnythingCommitted = isAnythingCommitted(opts)
console.log(is_AnythingCommitted)
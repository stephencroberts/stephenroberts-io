var fs = require('fs')
var AWS = require('aws-sdk')
AWS.config.loadFromPath('./config.json')
var s3 = new AWS.S3()

var DIST_DIR = './dist'
var CACHE_TIME = 300
var EXPIRES_DAYS = 365

// http content types
var CONTENT_TYPES = {
  html: 'text/html; charset=utf-8',
  png: 'image/png',
  jpg: 'image/jpg',
  ico: 'image/x-icon',
  js: 'application/javascript; charset=utf-8',
  css: 'text/css; charset=utf-8',
  default: 'binary/octet-stream'
}

// Scan dist directory for files to upload
fs.readdir(DIST_DIR, function(err, files) {
  if (err) {
    console.fail(err, err.stack)
    process.exit(1)
  }

  // Upload files
  files.map(function(file) {
    // Ignore files starting with .
    if (file[0] != '.') {
      uploadFile(file)
    }
  })
})

// Upload file to S3
function uploadFile(file) {

  var params = {
    Bucket: 'stephenroberts.io',
    Key: file,
    Body: fs.createReadStream(`${DIST_DIR}/${file}`),
    Expires: new Date((new Date()).getTime() + EXPIRES_DAYS*24*60*60000),
    CacheControl: `max-age=${CACHE_TIME}, public`,
    ContentType: getContentType(file),
    StorageClass: 'REDUCED_REDUNDANCY'
  }

  s3.putObject(params, function(err, data) {
    console.log(err, data)
  })
}

// Get content type from file extension
function getContentType(file) {
  var matches = file.match(/\.([a-z0-9]+)$/)
  if (matches !== null && matches.length > 1 && CONTENT_TYPES[matches[1]] !== undefined) {
    return CONTENT_TYPES[matches[1]]
  }
  return CONTENT_TYPES.default
}
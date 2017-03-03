/**
 * Create the promise returning `Async` suffixed versions of the functions below,
 * Promisify them if you can, otherwise roll your own promise returning function
 */

var fs = require('fs');
var request = require('request');
var crypto = require('crypto');
var Promise = require('bluebird');

// (1) Asyncronous HTTP request

var getGitHubProfileAsync = (user) => {
  var options = {
    url: 'https://api.github.com/users/' + user,
    headers: {
      'User-Agent': 'request'
    },
    json: true  // will JSON.parse(body) for us
  };

  return new Promise((reject, resolve) => {
    request.get(options, (err, res, body) => {
      if (err) {
        reject(err);
      } else if (body.message) {
        reject(new Error('Failed to get GitHub profile: ' + body.message), null);
      } else {
        resolve(body);
      }
    });
  }).then();
};
 // TODO


// (2) Asyncronous token generation
var generateRandomToken = function(callback) {
  crypto.randomBytes(20, function(err, buffer) {
    if (err) { return callback(err, null); }
    callback(null, buffer.toString('hex'));
  });
};

// TODO
var generateRandomTokenAsync = function() {
  return new Promise(function(resolve, reject) {
    crypto.randomBytes(20, function(err, buffer) {
      if (err) {
        return reject(err);
      }
      resolve(buffer.toString('hex'));
    });
  }).then();
};


// (3) Asyncronous file manipulation
var readFileAndMakeItFunny = function(filePath, callback) {
  fs.readFile(filePath, 'utf8', function(err, file) {
    if (err) { return callback(err); }

    var funnyFile = file.split('\n')
      .map(function(line) {
        return line + ' lol';
      })
      .join('\n');

    callback(funnyFile);
    });
};

// TODO
var readFileAndMakeItFunnyAsync = (filePath) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, file) => {
      if (err) { return reject(err); }
    });

    let funnyFile = file.split('\n')
      .map((line) => { line + ' lol'; })
      .join('\n');

    resolve(funnyFile);
  }).then();
};

// Export these functions so we can test them and reuse them in later exercises
module.exports = {
  getGitHubProfileAsync: getGitHubProfileAsync,
  generateRandomTokenAsync: generateRandomTokenAsync,
  readFileAndMakeItFunnyAsync: readFileAndMakeItFunnyAsync
};

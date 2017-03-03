/*
 * Write a function WITH NO CALLBACKS that,
 * (1) reads a GitHub username from a `readFilePath`
 *     (the username will be the first line of the file)
 * (2) then, sends a request to the GitHub API for the user's profile
 * (3) then, writes the JSON response of the API to `writeFilePath`
 *
 * HINT: We exported some similar promise-returning functions in previous exercises
 */

var fs = require('fs');
var Promise = require('bluebird');
let getGitHubProfile = require('./promisification').getGitHubProfileAsync;
let pluckFirstLine = require('./promiseConstructor').pluckFirstLineFromFileAsync;


var fetchProfileAndWriteToFile = function(readFilePath, writeFilePath) {
  return pluckFirstLine(readFilePath)
  .then(getGitHubProfile)
  .then((profile) => {
    return new Promise((resolve, reject) => {
      fs.writeFilePath(writeFilePath, JSON.stringify(profile), (err, content) => {
        if (err) {
          reject(err);
        } else {
          resolve(content);
        }
      })
    }
  })
};

// Export these functions so we can test them
module.exports = {
  fetchProfileAndWriteToFile: fetchProfileAndWriteToFile
};

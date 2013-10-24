// Semantic Versioning Tool
// ========================
//
// See: http://semver.org/
// For projects with package.json in the target folder.
//
// * Author: George Pantazis
//
// * Usage:
//   * Major (0.x.x -> 1.0.0) : `node version-update major`
//   * Minor (x.0.x -> x.1.0) : `node version-update minor`
//   * Patch (x.x.0 -> x.x.1) : `node version-update patch`
//   * Custom (x.x.x -> 1.2.3) : `node version-update custom 1.2.3`

var exec = require('child_process').exec,
  json = require('./package.json'),
  newVersion, splitVersion;

if (process.argv[2] === 'custom') {

  newVersion = process.argv[3];

} else {

  splitVersion = json.version.split('.');

  if (process.argv[2] === 'major') {
    splitVersion[0] = splitVersion[0] * 1 + 1;
    splitVersion[1] = 0;
    splitVersion[2] = 0;
  }

  if (process.argv[2] === 'minor') {
    splitVersion[1] = splitVersion[1] * 1 + 1;
    splitVersion[2] = 0;
  }

  if (process.argv[2] === 'patch') {
    splitVersion[2] = splitVersion[2] * 1 + 1;
  }

  newVersion = splitVersion.join('.');
}

exec('find ./* -type f | xargs perl -pi -e \'s/' + json.version + '/' + newVersion + '/g\'');
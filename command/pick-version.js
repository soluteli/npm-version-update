const inquirer = require("inquirer");
const semver = require("semver");
let v = "1.1.1";
const semverIncModes = [
  "patch",
  "minor",
  "major",
  "prepatch",
  "preminor",
  "premajor"
];

function getVersionChoices(version) {
  return semverIncModes.map(item => {
    let ret = semver.inc(version, item);
    return {
      name: `${item}(${ret})`,
      value: ret
    };
  });
}


function pickVersion({version, name}) {
  let choices = getVersionChoices(version)
  return inquirer
    .prompt([
      {
        type: "list",
        name: "version",
        message: `Which version do you want to pick for package ${name} ?(currently ${version})`,
        choices: [
          ...choices,
          {
            name: "custom",
            value: "custom"
          },
          {
            name: "prerelease",
            value: "prerelease"
          }
        ]
      }
    ])
    .then(answers => {
      if (answers.version === "custom") {
        return inquirer.prompt([
          {
            type: "input",
            name: "version",
            message: "Enter a custom version"
          }
        ]);
      } else if (answers.version === "prerelease") {
        let newVersion = semver.inc(v, "prerelease");
        return inquirer.prompt([
          {
            type: "input",
            name: "version",
            default: newVersion,
            message: `Enter a prerelease identifier (default: none, yielding ${newVersion})`,
            filter: function(val) {
              return semver.inc(v, "prerelease", val);
            }
          }
        ]);
      } else {
        return Promise.resolve(answers);
      }
    });
}

module.exports = pickVersion

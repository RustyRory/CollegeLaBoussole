// commitlint.config.js
module.exports = {
  extends: ["@commitlint/config-conventional"],
  ignores: [(commit) => commit.startsWith("Merge pull request")],
};

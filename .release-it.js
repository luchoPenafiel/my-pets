module.exports = {
  git: {
    commitMessage: 'chore: release v${version}',
    tagName: 'v${version}',
  },
  npm: {
    publish: false,
  },
  plugins: {
    '@release-it/conventional-changelog': {
      infile: 'CHANGELOG.md',
      preset: 'angular',
    },
  },
};
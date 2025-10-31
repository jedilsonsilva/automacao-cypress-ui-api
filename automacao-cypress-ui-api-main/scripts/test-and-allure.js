const { spawnSync } = require('child_process');

function run(cmd, args) {
  const res = spawnSync(cmd, args, { stdio: 'inherit', shell: true });
  return res.status === null ? res.error && res.error.code : res.status;
}

// Run Cypress tests
const testExitCode = run('npx', ['cypress', 'run']);

// Always generate the Allure report so we can inspect results even on failures
run('npx', ['allure', 'generate', 'allure-results', '--clean', '-o', 'allure-report']);

// Exit with original test exit code so CI reflects test status
process.exit(typeof testExitCode === 'number' ? testExitCode : 0);

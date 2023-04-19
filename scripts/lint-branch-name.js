#!/usr/bin/env node
const { execSync } = require('child_process');
const process = require('process');

const CommitTypes = ['fix', 'feat', 'build', 'chore', 'ci', 'docs', 'style', 'refactor', 'perf', 'test'];

const ticketRegex = /([A-Z]*)-(TICKET|\d*)/g;

const branchName = execSync('git rev-parse --abbrev-ref HEAD').toString().trim();

const [type, rest] = branchName.split('/');

if (!CommitTypes.includes(type)) {
  console.log(`"${type}" is not a valid type. Expected one of ${CommitTypes.join(', ')}`);
  process.exit(1);
}

const matches = ticketRegex.exec(rest);

if (!matches) {
  console.error(
    `"${branchName}" doesn't seem to be a valid branch name. Expected following pattern: "type/TICKET-some-optional-description"`
  );
  process.exit(1);
}

const ticketNumber = matches[2];

if (ticketNumber && ticketNumber === 'TICKET') {
  process.exit(0);
}

if (!matches || Number.isNaN(Number.parseInt(ticketNumber, 10))) {
  console.error(
    `"${branchName}" doesn't seem to be a valid branch name. Expected following pattern: "type/TICKET-some-optional-description"`
  );
  process.exit(1);
}

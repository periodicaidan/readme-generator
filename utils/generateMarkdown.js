// function to generate markdown for README
function generateMarkdown(data) {
  return `${data.title}
===

${makeBadge('License', data.license, 'green')}

## Table of Contents

1. [Description](#description)
2. [Installation](#installation)
3. [Usage](#usage)
4. [License](#license)
5. [Contributing](#contributing)
6. [Tests](#tests)
7. [Questions](#questions)

## Description

${data.description}

## Installation

${data.installation}

## Usage

${data.usage}

## License

This project is distributed under the ${data.license} license.

## Contributing

${data.contributing}

## Tests

${data.tests}

## Questions

Github: [${data.githubUsername}](https://github.com/${data.githubUsername})

Email: [${data.email}](mailto:${data.email})
`;
}

function makeBadge(key, value, color, alt) {
  // The null-coallescing operator (??) doesn't work in my version of Node for...some reason
  // so I've just done the more verbose alternative
  color = (color != null) ? color : 'blue';
  alt = (alt != null) ? alt : `${key}: ${value}`;
  return `[![${alt}](https://img.shields.io/badge/${key}-${value}-${color}.svg)](https://shields.io/)`
}

module.exports = generateMarkdown;

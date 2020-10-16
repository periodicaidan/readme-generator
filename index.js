const inquirer = require('inquirer');
const fs = require('fs');
const generateMarkdown = require('./utils/generateMarkdown');

const LICENSES = ['GPLv3', 'MIT', 'Apache', 'BSD-3-Clause', 'BSD-2-Clause', 'LGPL', 'MPL', 'CDDL', 'EPL', 'CC0']

// RFC 5322-compliant regular expression that matches an email address
// Don't bother
const EMAIL_REGEX = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/

// array of questions for user
const questions = [
    {
        name: 'title',
        message: 'Title:'
    },
    {
        name: 'description',
        message: 'Description:',
    },
    {
        name: 'installation',
        message: 'Installation instructions:',
    },
    {
        name: 'usage',
        message: 'Usage instructions:',
    },
    {
        name: 'contributing',
        message: 'Contributing guidelines:'
    },
    {
        name: 'tests',
        message: 'Testing instructions:',
    },
    {
        type: 'list',
        name: 'license',
        message: 'License:',
        choices: LICENSES,
    },
    {
        name: 'githubUsername',
        message: 'GitHub Username:',
    },
    {
        name: 'email',
        message: 'Email:',
        validate: email => EMAIL_REGEX.test(email),
    }
];

// function to write README file
function writeToFile(fileName, data) {
    fs.writeFile(fileName, generateMarkdown(data), err => {
        if (err) {
            console.error(err);
        } else {
            console.log('Wrote README.md');
        }
    });
}

// function to initialize program
function init() {
    inquirer.prompt(questions)
        .then(answers => writeToFile('README.md', answers));
}

// function call to initialize program
init();

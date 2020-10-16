const inquirer = require('inquirer');
const fs = require('fs');
const generateMarkdown = require('./utils/generateMarkdown');

const LICENSES = ['GPLv3', 'MIT', 'Apache', 'BSD-3-Clause', 'BSD-2-Clause', 'LGPL', 'MPL', 'CDDL', 'EPL', 'CC0']

// array of questions for user
const questions = [
    {
        type: 'input',
        name: 'title',
        message: 'Title:'
    },
    {
        type: 'input',
        name: 'description',
        message: 'Description:',
    },
    {
        type: 'input',
        name: 'installation',
        message: 'Installation instructions:',
    },
    {
        type: 'input',
        name: 'usage',
        message: 'Usage instructions:',
    },
    {
        type: 'input',
        name: 'contributing',
        message: 'Contributing guidelines:'
    },
    {
        type: 'input',
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
        type: 'input',
        name: 'githubUsername',
        message: 'GitHub Username:',
    },
    {
        type: 'input',
        name: 'email',
        message: 'Email:',
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

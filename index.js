#!/usr/bin/env node

const fs = require('fs');
const { lstat } = fs.promises;
const chalk = require('chalk');
const path = require('path');

const targetDir = process.argv[2] || process.cwd();

fs.readdir(targetDir, async (err, filenames) => {
    if (err)
        console.log(err);
    let allStats = [];
    for (let filename of filenames) {
        allStats.push(lstat(path.join(targetDir, filename)));
    }
    allStats = await Promise.all(allStats);

    for (let i = 0; i < allStats.length; i++) {
        if (allStats[i].isFile())
            process.stdout.write(`${chalk.yellowBright(filenames[i])}  `);
        else
            process.stdout.write(`${chalk.blueBright.bold(filenames[i])}  `);
    }
});
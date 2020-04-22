#!/usr/bin/env node

const program = require('commander');
const path = require('path');
const chalk = require('chalk');

const gitpull = require('../src/scripts/gitpull');

const pkg = require(path.resolve(__dirname, '../package.json'));

program.version(pkg.version, '-v, --version', '显示当前版本号');

program
    .command('gitpull <optPath>')
    .description('更新指定目录下，所有 git 项目代码')
    .action((optPath) => {
        gitpull(optPath);
    });


program.parse(process.argv);
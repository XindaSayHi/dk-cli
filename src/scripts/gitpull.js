
/**
 * @file 批量更新 git 项目代码
 * @author xinda
 */

const path = require('path');
const fs = require('fs-extra');
const chalk = require('chalk');
const {exec} = require('child_process');

module.exports =  gitpull = async (optPath) => {
    
    console.log(chalk.blue(`\n开始更新 git 项目...\n`));
    const workPath = path.resolve(process.cwd(), optPath);

    if (!fs.pathExistsSync(workPath)) {
        console.log(chalk.red(`指定的目录路径不存在，程序结束`))
        return;
    };

    await fs.readdir(workPath, (err, files) => {
        if (err) {
            console.log(chalk.red(`请指定文件夹作为目标目录`));
            return;
        };

        files.forEach((fileName, index) => {

            const total = files.length;
            const filePath = `${workPath}/${fileName}`;
            const logPrefix = `  -> [${index+1}/${total}]  ${fileName} `;

            fs.stat(filePath, (err, stats) => {
                if (err) {
                    console.log(chalk.cyanBright(`${logPrefix}读取失败，已忽略`));
                    return;
                };

                if (!stats.isDirectory()) {
                    console.log(chalk.cyanBright(`${logPrefix}非目录，已忽略`));
                    return;
                };

                if (!fs.pathExistsSync(`${filePath}/.git`)) {
                    console.log(chalk.cyanBright(`${logPrefix}非 Git 目录，已忽略`));
                    return;
                };

                exec('git pull', {
                    cwd: `${filePath}`,
                }, (err) => {
                    if (err) {
                        console.log(chalk.red(`${logPrefix}代码更新失败，错误信息:`));    
                        console.log(chalk.red(`${err}`));
                        return;
                    }
                    console.log(chalk.cyanBright(`${logPrefix}代码已更新成功`));
                });
            });
        });
    });
};

#! /usr/bin/env node

const fs = require('fs')
const program = require('commander')
const download = require('download-git-repo')
const chalk = require('chalk')
const ora = require('ora')

const requiredPackageVersion = require('../package.json').version

program.version(requiredPackageVersion).option('-i, init [name]', '初始化项目').parse(process.argv)

if (program.init) {
    const spinner = ora('正在下载').start()
    download('Kunkka0229/frontend-template', program.init, function (err) {
        if (!err) {
            fs.readFile(`${process.cwd()}/${program.init}/package.json`, (err, data) => {
                if (err) throw err
                let _data = JSON.parse(data.toString())
                _data.name = program.init
                _data.version = '1.0.0'
                let str = JSON.stringify(_data, null, 4)
                fs.writeFile(`${process.cwd()}/${program.init}/package.json`, str, function (err) {
                    if (!err) {
                        spinner.succeed(chalk.blueBright('下载成功'))
                        spinner.stop()
                    }
                })
            })
        } else {
            console.error(error)
            // 可以输出一些项目失败的信息
        }
    })
}

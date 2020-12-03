#! /usr/bin/env node

const fs = require('fs')
const program = require('commander')
const download = require('download-git-repo')
const chalk = require('chalk')
const ora = require('ora')

const requiredPackageVersion = require('../package.json').version
const { clearConsole } = require('./util/index')

program.version(requiredPackageVersion).option('-i, init [name]', '初始化项目').parse(process.argv)

if (program.init) {
    clearConsole('cyan', `XDF-BUILD v${require('../package').version}`)
    const spinner = ora('正在下载').start()
    download('http://tfs.staff.xdf.cn/tfs/NIS/usercenter/_git/frontend-template', program.init, function (err) {
        if (!err) {
            fs.readFile(`${process.cwd()}/${program.init}/package.json`, (err, data) => {
                if (err) throw err
                let _data = JSON.parse(data.toString())
                _data.name = program.init
                _data.version = '1.0.0'
                let str = JSON.stringify(_data, null, 4)
                fs.writeFile(`${process.cwd()}/${program.init}/package.json`, str, function (err) {
                    if (!err) {
                        console.info(chalk.blueBright('下载成功'))
                    }
                })
            })
        } else {
            // 可以输出一些项目失败的信息
        }
    })
}

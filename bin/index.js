#!/usr/bin/env node

const inquirer = require('inquirer')
const prompts = require('./promptDatas')

const clone = require("git-clone-promise");
const download = require('download-git-repo');
const semver = require("semver");
const program = require("commander");
const shell = require("shelljs");
const chalk = require("chalk");
const path = require("path");
const requiredVersion = require("../package.json").engines.node;

function checkNodeVersion(wanted, id) {
	if (!semver.satisfies(process.version, wanted)) {
		console.log(
			chalk.red(
				"您的Node版本是：" + process.version + ", 该" + id + "需要的Node版本为" + wanted + ".\n请更新你的Node版本."
			)
		);
		process.exit(1);
	}
}
checkNodeVersion(requiredVersion, "jcm-cli");
if (!shell.which("git")) {
	console.log(chalk.red(`您的系统没有配置git环境变量，请先配置git环境变量!`));
	process.exit(1);
}
program
	.version("1.0.0")
	.command("create [projectName]")
	.alias("c")
	.description("用来创建项目")
	.action(function (projectName = "demo-project", options) {
		console.log(chalk.green(`jcm-cli正在为你服务`));
		const answer = inquirer.prompt(prompts.frameWorkPrompt)
		answer.then(async (result) => {
			const {
				url,
				gitName,
				val
			} = result.type;
			console.clear()
			inquirer.prompt(prompts.reactPrompt).then(async () => {
				download('github:maixing/ultra-react#master', projectName, {
					clone: true
				}, (err) => {
					console.log(err ? 'Error' : 'Success')
				})
			})
		});
		// let prectType = "git@github.com:maixing/ultra-react.git";
		// if (type == "ts") {
		// 	prectType = "git@github.com:maixing/ultra-react-ts.git";
		// }
		// clone(prectType, localpath).then((res) => {
		// 	shell.rm("-rf", path.join(localpath, ".git"));
		// 	shell.cd(projectName);
		// 	console.log(chalk.green(`工程创建完毕………………`));
		// 	console.log(chalk.green(`开始安装依赖包,可能需要几分钟，请耐心等待………………`));
		// 	shell.exec("npm install --registry=https://registry.npm.taobao.org --ignore-script");
		// 	console.log(chalk.green(`依赖包安装完毕!`));
		// 	console.log(chalk.blue(`请参考${projectName}/README.md，进行项目开发`));
		// });
	});

program.parse(process.argv);
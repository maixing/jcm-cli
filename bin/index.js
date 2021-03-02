#!/usr/bin/env node

const inquirer = require('inquirer')
const prompts = require('./promptDatas')
const ora = require("ora");
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

function cloneGit(projectName, url) {
	let process = ora(`正在创建${projectName}项目中....`);
	process.start();
	download(url, projectName, {
		clone: true
	}, (err) => {
		console.log(err ? 'Error' : 'Success')
		if (!err) {
			process.succeed();
			// console.log(chalk.green(`项目创建成功,即将为您初始化，请稍等!`));
			// process = ora(`项目创建成功,即将为您初始化，请稍等!`);
			process.stopAndPersist({
				text: '项目创建成功,即将为您初始化，请稍等!'
			})
			process.start();
			shell.cd(projectName);
			shell.exec("npm i --registry=https://registry.npm.taobao.org --ignore-script");
			console.log(chalk.green(`依赖包安装完毕!`));
			process.succeed();
		} else {
			process.fail();
			process.stop()
		}
	})
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
				name,
				url
			} = result.type;
			console.log('result---->>%o', result);
			console.clear()
			if (name === 'vue3-demo') {
				cloneGit(projectName, url)
			} else {
				inquirer.prompt(prompts.reactPrompt).then(async (p) => {
					cloneGit(projectName, p.type.url)
				})
			}
		});
	});

program.parse(process.argv);
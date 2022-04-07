const {
  promisify
} = require('util');
const figlet = promisify(require('figlet'));
const clear = require('clear');
const chalk = require('chalk');
const {
  clone
} = require('./download');
const log_green = content => console.log(chalk.green(content));
const log_blue = content => console.log(chalk.blue(content));
// promisiy化spawn
// 对接输出流
const spawn = async (...args) => {
  const {
    spawn
  } = require('child_process');
  return new Promise(resolve => {
    const proc = spawn(...args);
    proc.stdout.pipe(process.stdout);
    proc.stderr.pipe(process.stderr);
    proc.on('close', () => {
      resolve();
    });
  });
};
const open = require("open");
// module.exports = async name => {
//   // 打印欢迎画面
//   clear();
//   const data = await figlet('RXU-AUTO Welcome' + name);
//   log_green(data);
// }


module.exports= async (name,options) => {
  clear();
  const welcome = await figlet('RXU-AUTO Welcome');
  console.log(welcome);
  // console.log('init ' + name)
  log_blue('创建项目:' + name);
  
  // 从github克隆项目到指定文件夹
  if(options.webpack=="4"){
    await clone('github:chxuxu/react-wp4-demo', name);
  }else{
    await clone('github:chxuxu/react-wp5-demo', name);
  }
  return;
  log_blue('安装依赖');
  await spawn(process.platform === 'win32' ? 'cnpm.cmd' : 'cnpm', ['install'], {
    cwd: `./${name}`
  });
  const finish = await figlet('安装完成');
  log_green(finish);
  log_green(`
  请使用以下命令启动应用:
  ===========================
  cd ${name}
  npm run dev
  ===========================`);
  // 打开浏览器
  //open(`http://localhost:9000`);dev命令已经自动打开
  await spawn(process.platform === 'win32' ? 'npm.cmd' : 'npm', ['run', 'dev'], {
    cwd: `./${name}`
  })

}
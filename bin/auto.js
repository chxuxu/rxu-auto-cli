#!/usr/bin/env node

const program = require('commander');
function myParseInt(value, dummyPrevious) {
  // parseInt 参数为字符串和进制数
  const parsedValue = parseInt(value, 10);
  if (isNaN(parsedValue)) {
    throw new program.InvalidArgumentError('Not a number.');
  }
  return parsedValue;
}
program.version(require('../package').version);
program
  .command('init <name>')//定义命令 init
  .description('init project')//确定命令init 的描述信息
  .option('-wp, --webpack <version>', '指定webpack版本')
  .action(require('../lib/init'))//执行命令结果，传递<name>作为参数

program
.command('update')
.description('update files...')
.option('-wp, --webpack <version>', '指定webpack版本')
.argument('<username>', 'user to login')
.argument('[password]', 'password for user, if required', 'no password given')
.action(require('../lib/update'));//(username,password,opts,command)=>{}

program.parse(process.argv);
console.log("rxu-auto-cli.......");
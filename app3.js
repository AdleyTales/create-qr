// var spawn = require('child_process').spawn;
// let wc = spawn('wc', ['-l']); //wc -l upload/222.txt

var exec = require('child_process').exec,
    wc = exec('wc -l upload/222.txt');

// 捕获标准输出并将其打印到控制台 
wc.stdout.on('data', function (data) {
    // console.log('standard output:\n' + data);
    // console.log(typeof data); //string
    let nums = data.trim().split(' ')[0];
    console.log(nums);
    
});

// 捕获标准错误输出并将其打印到控制台 
wc.stderr.on('data', function (data) {
    console.log('standard error output:\n' + data);
});

// 注册子进程关闭事件 
// wc.on('exit', function (code, signal) {
//     console.log('child process eixt ,exit:' + code);
// }); 
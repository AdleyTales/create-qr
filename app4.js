const readline = require('readline');
const fs = require('fs');
const qrCodeLogo = require('qrcode-logo');
const exec = require('child_process').exec;
const path = require('path');

let myfile = path.join(__dirname, 'upload/222.txt');

// console.log(myfile);

const rl = readline.createInterface({
    input: fs.createReadStream(myfile)
});

console.log(`开始执行的时间：${new Date()}`);


// 
rl.on('line', line => {
    let _line = line.trim();
    // createQR(_line);

    //getTotalLine(myfile)
    setTimeout(function(){
        createQR(_line, 19);
    },2000)
    

    // let _qr = await createQR(_line);

    // if(_qr){
    //     console.log(`progress进度为：${ n*100/_total }%`);
    // }
    // n++;
});

// 读取完毕
rl.on('close', line => {
    console.log('文件读取完成了');
});


/**
 * 生成二维码
 */
let n=1
function createQR(line, total) {

    if(line == ''){
        return;
    }

    //生成二维码的位置
    var qrcodeImgFilePath = `images/${line}.png`;

    // logo
    var logoBuffer = fs.readFileSync(path.join(__dirname, 'logo.jpg'), {
        encoding: null
    });

    qrCodeLogo(line, qrcodeImgFilePath, {
        size: 11,  // 二维码单位块大小
        logo: logoBuffer, // logo数据
        margin: 2,
        logoBorder: {   // border边框配置
            width: 4,
            // color: 0xcccfff
        },
        bottomText: {  // 底部文本框配置
            height: 34,
            text: '             ' + line,
            size: 18,
            bgColor: 0xEDEDED,
            // bgColor: 0x00CED1
        }
    }, (err, img) => {
        // console.log(err, img);
        // if (err) {
        //     console.log(err);
        // } else {
        //     console.log(`progress进度为：${ n*100/total }%`);     
        //     n++;  
        // }

        console.log(`progress进度为：${ n*100/total }% -- ${new Date()}`);     
        n++;  
    });
}

/**
 * 获取要读取文件的所有函数 
 * node 调用系统的shell
 * child_process
 */
function getTotalLine(myfile) {
    return new Promise((resolve, reject) => {
        const wc = exec(`wc -l ${myfile}`);

        // 捕获标准输出并将其打印到控制台 
        wc.stdout.on('data', function (data) {
            let total = data.trim().split(' ')[0];
            resolve(total);
        });

        // 捕获标准错误输出并将其打印到控制台 
        wc.stderr.on('data', function (data) {
            reject(data);
        });

    });
}
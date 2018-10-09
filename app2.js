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

// 
rl.on('line', line => {
    let _line = line.trim();
    createQR(_line);
    console.log(_line);
    
});

// 读取完毕
rl.on('close', line => {
    console.log('完成了 100%!');
});

function createQR(line) {

    //生成二维码的位置
    var qrcodeImgFilePath = `images/${line}.png`;

    // logo
    var logoBuffer = fs.readFileSync('logo.jpg', {
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
        if(err){
            console.log('生成二维码失败！');
        }

        if(!err){
           console.log(`==========${line}===============`);
        }
    });
}
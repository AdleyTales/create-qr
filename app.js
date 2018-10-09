/**
 * Intro:
 * qrcode-logo 依赖 node-gd 
 * node-gd macos 依赖 pkg-config gd ### brew install pkg-config gd
 * homebrew 的国内源
 */

const fs = require('fs');
const qrCodeLogo = require('qrcode-logo');

const line = '4101030692101';

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
    console.log(err, img);
});
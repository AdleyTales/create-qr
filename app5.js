const fs = require('fs');

fs.readFile('./upload/222.txt', (err, data) => {
    // console.log(data.toString());
    let str = data.toString();
    let arr = str.split('\n');
    console.log(arr);
    

})
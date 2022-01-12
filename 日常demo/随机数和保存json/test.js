const request = require("request")
const fs = require('fs');

let url1 = "https://jc.zhcw.com/port/client_json.php?callback=jQuery1122003729086978390472_1641264288607&transactionType=10001001&lotteryId=1&issueCount=100&startIssue=&endIssue=&startDate=&endDate=&type=0&pageNum=1&pageSize=30&tt=0.05031756635322049&_=1641264288616"


let baseUrl = "https://jc.zhcw.com/port/client_json.php"
let callbackParm = "jQuery1122003729086978390472_1641264288607"
let transactionType = 10001001
let lotteryId = 1
let issueCount = 1000000  //查询的期数
let pageNum = 1      //第几页
let pageSize = 3000000    //每页的条目

let url = `${baseUrl}?callback=${callbackParm}&transactionType=${transactionType}&lotteryId=${lotteryId}&issueCount=${issueCount}&pageNum=${pageNum}&pageSize=${pageSize}&tt=0.05031756635322049&startIssue=&endIssue=&startDate=&endDate=&type=0&&_=1641264288616`
console.log("request url:", url)

const option = {
    url: url,
    method: "get",
    headers: {
        "Referer": "https://www.zhcw.com/kjxx/ssq/",
        "Sec-Fetch-Mode": "no-cors"
    },

}

request(option, function (error, response, body) {
    if (error) {
        console.log(111222)
    } else if (response.statusCode !== 200) {
        console.log(2222)
    } else {
        let data = getJson(response.body)
        console.log(data.data.length)
        saveJsonByFs(data.data)
        saveIssueNumAryByFs(data.data)
        saveNumAryByFs(data.data)
    }
})


function saveJsonByFs (data) {
    let content = JSON.stringify(data);
    fs.writeFile('data.json', content, 'utf8', (err) => {
        //如果 err===null,表示文件写入
        //只要 err 里面不是null，就表示写入文件失败了！
        if (err) {
            console.log('写入文件出错拉！具体错误：' + err)
        } else {
            console.log('ok');
        }
    });
}

function saveIssueNumAryByFs (data) {
    let numAry = data.map(item => {
        return `${item.issue}: ${item.frontWinningNum} ${item.backWinningNum}`
    })
    let content = JSON.stringify(numAry);
    fs.writeFile('issueNumAry.json', content, 'utf8', (err) => {
        if (err) {
            console.log('写入文件出错拉！具体错误：' + err)
        } else {
            console.log('ok');
        }
    });
}

function saveNumAryByFs (data) {
    let numAry = data.map(item => {
        return `${item.frontWinningNum} ${item.backWinningNum}`
    })
    getFiveNumber(numAry)
    let content = JSON.stringify(numAry);
    fs.writeFile('numAry.json', content, 'utf8', (err) => {
        if (err) {
            console.log('写入文件出错拉！具体错误：' + err)
        } else {
            console.log('ok');
        }
    });
}

function getJson (data) {
    var str = data.replace('jQuery1122003729086978390472_1641264288607(', '').replace(')', '')
    return JSON.parse(str)
}


function createNum (result) {
    var arr = [];
    while (arr.length < 6) {
        var result_sum = prefixInteger(parseInt(Math.floor(Math.random() * 33) + 1, 10), 2);
        if (!arr.includes(result_sum)) {
            arr.push(result_sum);
        }
    }
    arr.sort((a, b) => a - b);
    while (arr.length < 7) {
        var result_sum = prefixInteger(parseInt(Math.floor(Math.random() * 16) + 1, 10), 2)
        if (!arr.includes(result_sum)) {
            arr.push(result_sum);
        }
    }
    if (result.includes(arr.join())) {
        return createNum()
    } else {
        return arr.join();
    }
}

function prefixInteger (num, n) {
    return (Array(n).join(0) + num).slice(-n)
}

function getFiveNumber (all) {
    var result = Array(5).fill(8);
    result.forEach((_item, index, ary) => {
        ary[index] = createNum(all);
    });

    let res = [...new Set(result)]


    console.log("res.length", res.length)
    console.log("res", res);
}














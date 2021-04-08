/**
 * author   lut000
 * date     2019/09/11
 * purpose  通用层方法
 * */
import JSZip from 'jszip'
import FileSaver from 'file-saver'
export default {

    saveImgFn (opt={},callback){
        let self=this;
        opt.src='http://glp-common.oss-cn-shanghai.aliyuncs.com/tmp/62594662-B45C-4344-9F70-FF6DAD268D5D.png';
        if(opt.src){
            let oImg=new Image();
            oImg.setAttribute("crossOrigin",'Anonymous')
            oImg.onload=function(){
                let canvas=self.setCanvas(this.width,this.height);
                // 画图
                self.drawCanvas(canvas,this);
                // 导出数据
                self.getCanvasData(canvas,opt.name,opt.type,callback);
            }
            oImg.onerror=function(){
                if(callback){
                    callback('下载失败！');
                }else {
                    console.log('下载失败');
                }
            }
            oImg.src=opt.src;
        }else{
            if(callback){
                callback('图片src为空！');
            }else {
                console.log('图片src为空！');
            }
        }
    },

    setCanvas (w,h){                                           //创建canvas dom
        let canvas=null;
        if(document.body.querySelector('#canvas-download-dom')){
            canvas=document.body.querySelector('#canvas-download-dom');
        }else {
            canvas=document.createElement('canvas');
            canvas.style.cssText='position:fixed;z-index:10;left:0;top:0';
            document.body.append(canvas);
        }
        canvas.width=w;
        canvas.height=h;
        return canvas;
    },

    drawCanvas (canvas,img){                                           //画canvas
        let w=canvas.width;
        let h=canvas.height;
        let ctx = canvas.getContext('2d');
        ctx.clearRect(0,0,w,h);
        ctx.drawImage(img,0,0,w,h);
    },


    getCanvasData (canvas,name,type,callback){                          //获取canvas数据
        let re=/\.(png|jpg|jpeg|gif|bmp)$/i;
        let reJpg=/image\/(jpg|jpeg)/i;
        let dataType='image/png';                               //默认输出类型png
        let matchObj=name.match(re);
        // 文件名称
        let filename='';
        if(!type){
            let matchType=matchObj[1];
            if(reJpg.test(matchType)){
                dataType='image/jpeg';
            }
        }else {
            if(reJpg.test(type)){
                dataType='image/jpeg';
            }
            
        }
        if(matchObj){
            filename=name;
        }else {
            filename=name+dataType.replace('image/','.');
        }
        // let quality=1;


        let base64 = canvas.toDataURL(dataType);
        this.downloadCanvasFile(canvas,base64,filename);
    },
    /**
     * 在本地进行文件保存
     * @param  {String} data     要保存到本地的图片数据
     * @param  {String} filename 文件名
     */
    downloadCanvasFile (canvas,data,filename){                              //下载
        try{
            let save_link = document.createElementNS('http://www.w3.org/1999/xhtml', 'a');
            save_link.href = data;
            save_link.download = filename;

            let event = document.createEvent('MouseEvents');
            event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
            save_link.dispatchEvent(event);
        }catch(e){
            if(canvas.msToBlob){
                // 支持msToBlob
                // console.log("msToBlob下载");
                let blob = canvas.msToBlob(data);
                window.navigator.msSaveBlob(blob,filename);
            }else {
                // 不支持msToBlob
                // console.log('服务器下载');
                // let form=document.createElement("form");
                // form.setAttribute("method","post");
                // form.setAttribute("target","");
                // form.setAttribute("action","/api/virtualsplsimulatedown/");
                // let input1=document.createElement("input");
                // input1.setAttribute("name","imgbody");
                // input1.value=data;
                // // let input2=document.createElement("input");
                // // input2.setAttribute("name","name");
                // // input2.value=filename;
                // form.appendChild(input1);
                // // form.appendChild(input2);
                // document.body.appendChild(form);
                // form.submit();//表单提交
            }
        }
    },

    downloadFileFn (file,callback){                                           //下载单个文件
        // 请求对象
        function request(file) {
            // let url='https://glp168-account-test.oss-cn-shanghai.aliyuncs.com/ua/2019-9-10/AE58EFB6-5626-4EC7-8376-ED2014344E47.xlsx';
            let url=file.url;
            // console.log('下载地址：',url);
            let s=url.indexOf('?')!=-1?'&':'?';
            return fetch(url+s+'t='+new Date().getTime(),{
                method:'get',
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            }).then(
                res => {
                    if(res.ok){
                        let data=res.blob();
                        return data;
                    }
                }
            )
        }

        request(file).then(
            res => {
                FileSaver.saveAs(res,file.name);
                if(callback){
                    callback();
                }
            },
            err => {
                if(callback){
                    callback(err);
                }
            }
        )
    },
    downloadZipFn(files,filesName,callback){                                            //下载zip压缩包
        let zip = new JSZip();
        // let a = document.querySelector("a");
        // 要下载的url数组
        let data = files || [{
            url:"https://glp-ps-route.oss-cn-shanghai.aliyuncs.com/110101999999446/20190710/GLP19071015473400249.pdf",
            name:'GLP19071015473400249.pdf'
        }];
        // 请求对象
        function request(file) {
            // let url='https://glp168-account-test.oss-cn-shanghai.aliyuncs.com/ua/2019-9-10/AE58EFB6-5626-4EC7-8376-ED2014344E47.xlsx';
            let url=file.url;
            return fetch(url+'?t='+new Date().getTime(),{
                method:'get',
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            }).then(
                res => {
                    if(res.ok){
                        let data=res.blob();
                        
                        zip.file(file.name, data);
                        return {url,data};
                    }
                }
            )
        }

        // 利用Promise.all功能统一处理所有请求
        Promise.all(data.map(function(item) {
            return request(item)
        })).then(function(response) {
            // 压缩为zip文件
            zip.generateAsync({
                type: "blob",
                comment:'aaa'
            }).then(function(content) {
                filesName=filesName?filesName:new Date().getTime();
                let filename="glp-"+filesName+'.zip';
                FileSaver.saveAs(content,filename);

                if(callback){
                    callback()
                }
            });
        }).catch(function(res){
            callback(res);
        })
    },


    forFn (ruleFn,callback,times=100){                              //等待状态返回
        fn();
        function fn(){
            let timer=setTimeout(() => {
                clearTimeout(timer);
                if(!ruleFn()){
                    fn();
                }else {
                    callback();
                }
            },times);
        }
    },


    getSearchParams (key,str){                                      //查询字段值
        let t=str?str:window.location.search;
        let val='';
        if(t){
            console.log(t)
            t=t.substr(1);
            let arr=t.split('&');
            console.log(arr);
            for(let i=0,len=arr.length;i<len;i++){
                let item=arr[i];
                if(item){
                    let re=new RegExp(key+'=','i');
                    if(re.test(item)){
                        val=item.replace(key+'=','');
                        break;
                    }
                }
            }
        }
        return val;
    },
    deepClone (obj){                    //深度克隆对象
        
        if(obj){
            let newObj=Array.isArray(obj)?[]:{}
            if(obj && typeof obj ==="object"){
                for(let key in obj){
                    if(Object.prototype.hasOwnProperty.call(obj,key)){
                        newObj[key]=(obj && typeof obj[key]==='object')?this.deepClone(obj[key]):obj[key];
                    }
                }
            }
            return newObj
        }
        return obj;
    },
    setMoneyString (str){                       //金额分割
        let val='';
        if(str){
            str+='';
            let lastStr='';
            if(str.indexOf('.')!=-1){
                let arr=str.split('.');
                str=arr[0];
                lastStr='.'+arr[1];
            }
            str=str.split('').reverse().join('');
            let len=Math.ceil(str.length/3);
            
            for(let i=0;i<len;i++){
                val+=str.substr(i*3,3)+',';
            }
            val=val.substr(0,val.length-1);
            val=val.split('').reverse().join('');
            val+=lastStr;
            this.totalPrice=val;
        }
        return val;
    }
}
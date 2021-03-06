/**
 * author   lut000
 * date     2019/08/29
 * purpose  业务层公用方法
 * */


import {SelectionOptions} from '@/js/common/consts'
import {regex} from '@/utils/formCheck'
export default {
    setInputFocus (callback,context){                               //第一个表单获焦
        setTimeout(()=>{
            let isError= document.querySelectorAll(".is-error");
            try{
                
                let tar=isError[0].querySelector('input');
                if(tar.type=='checkbox' || tar.type=='file'){

                    let num=98+52;                  //98为遮罩层高度，52位修正系数
                    let currentScrollTop=document.documentElement.scrollTop;
                    let top=tar.type=='file'?tar.parentNode.getBoundingClientRect().top:tar.getBoundingClientRect().top;

                    if(num>top){
                        currentScrollTop-=Math.abs(num-top);
                    }
                    window.scrollTo(0,currentScrollTop)
                }else {
                    tar.focus();    
                }
                
            }catch(e){
                let tar=isError[0].querySelector('select');
                if(tar){
                    tar.focus();
                }
            }
            isError=null;
        },50)
        if(callback instanceof Function){
            callback.call(context,null);
        }
    },



    setLocalData (parnetKey,keyName,val,type){                         //设置本地存储  parnetKey=顶级键名  keyName=键名，val=值，type=1 localStorage,type=2 sessionStorage
        let dataType=type==2?'sessionStorage':'localStorage';
        let globalStr=window[dataType].getItem(parnetKey);
        let globalObj=globalStr?JSON.parse(globalStr):{};
        globalObj[keyName]=val;
        window[dataType].setItem(parnetKey,JSON.stringify(globalObj));
    },
    getLocalData (parnetKey,keyName,type){                         //获取本地存储  parnetKey=顶级键名  keyName=键名，type=1 localStorage,type=2 sessionStorage
        let dataType=type==2?'sessionStorage':'localStorage';
        let globalStr=window[dataType].getItem(parnetKey);
        let globalObj=globalStr?JSON.parse(globalStr):{};
        return globalObj[keyName];
    },

    setFileParams (data,key,code){                                       //文件上传接口配置参数
        let arr=[];
        if(data){
            data.forEach(item => {
                let file={};
                file.name=item.name;
                // file.type=item.data.suffix;
                file.ownerType=code;                        //所属类型 10-仓库 20-运行方 30-关联关系 40-盘点明细
                file.typeCode=SelectionOptions.FilestypeCode[key].code;
                file.url=item.url;

                arr.push(file);
            })
        }
        return arr;
    },
    setShowFile (data){                                       //文件回显处理
        let arr=[];
        if(data){
            data.forEach(item => {
                let {name=''}=item;
                let re=regex.isImg;
                if(name){
                    if(re.test(name)){
                        item.isImg=true;
                    }
                }
                item.data={
                    url:item.url
                }
                // let file={};
                // file.name=item.name;
                // // file.type=item.data.suffix;
                // file.ownerType=code;                        //所属类型 10-仓库 20-运行方 30-关联关系 40-盘点明细
                // file.typeCode=SelectionOptions.FilestypeCode[key].code;
                // file.url=item.data.url;

                // arr.push(file);
            })
        }
        return arr;
    }
}
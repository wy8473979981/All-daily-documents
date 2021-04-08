/*
	#author		lut000
	#date 		2019/08/07
	#purpose	常用表单校验
	#version	1.0.0
*/
export const regex={
    email:/[^\u4E00-\u9FA5\uF900-\uFA2D]+@[0-9a-zA-Z]+\.[a-zA-Z]{2,}$/i,						//邮箱
    idCard:/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i,			//身份证
    hkCreditCode:/^\d{7}$/,											 //香港企业证件号码
    bankcard:/^\d{13,19}$/,											 //银行卡
    mobile:/^1\d{10}$/,											 	 //手机号
    zipCode:/^\d{6}$/,											 	 //邮政编码
    telephoneNumber:/^(\d{3,4}-)?\d{6,8}(-\d{1,4})?$/,			 //座机号
    money:/^\d+(\.\d{1,2}|\d+)?$/,									 //类金额数字
    interest:/^\d+(\.\d{1,2}|\d+)?$/,							     //利息
    personNumber:/^\d+$/,							 			     //人数
    isImg:/\.(png|jpg|jpeg|gif|bmp)$/i,							 	 //是否图片
    specialWord:/\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/        //表情符号
};


export const checkFn={
    validateCreditCode(opt,creditCodeStr,callback) {								//校验企业统一社会信用代码
        if(!creditCodeStr){
            callback();
            return;
        }
        let patrn = /^[0-9A-Z]+$/; //18位校验及大写校验
        if (creditCodeStr.length != 18 || patrn.test(creditCodeStr) == false) {
            callback(opt.msg);
        } else {
            let codeByte; //统一社会信用代码的每一个值
            let codeByteWeight; //统一社会信用代码每一个值的权重
            let total = 0;
            let weightedfactors = [1, 3, 9, 27, 19, 26, 16, 17, 20, 29, 25, 13, 8, 24, 10, 30, 28]; //加权因子
            let str = '0123456789ABCDEFGHJKLMNPQRTUWXY'; //不用I、O、S、V、Z
            for (let i = 0,len=creditCodeStr.length; i < len - 1; i++) {
                  codeByte = creditCodeStr.substring(i, i + 1);
                  codeByteWeight = str.indexOf(codeByte);
                  total = total + codeByteWeight * weightedfactors[i]; //权重与加权因子相乘之和
            }
            let logiccheckcode = 31 - total % 31;

            if (logiccheckcode == 31) {
              logiccheckcode = 0;
            }

            let range = "0,1,2,3,4,5,6,7,8,9,A,B,C,D,E,F,G,H,J,K,L,M,N,P,Q,R,T,U,W,X,Y";
            let rangeArr = range.split(',');
            logiccheckcode = rangeArr[logiccheckcode];
            let checkcode = creditCodeStr.substring(17, 18);

            if (logiccheckcode != checkcode) {
                callback(opt.msg);
            }else{
                callback();
            }
        }
    },
    validateIdcard (opt,val,callback){                                                  //校验身份证
        let city = {11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江 ",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北 ",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏 ",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外"};
        let re=regex.idCard;
        val = val.toLocaleUpperCase();
        if (!val || !re.test(val)){
            callback('身份证号格式错误');
        } else if (!city[val.substr(0, 2)]) {
            callback('地址编码错误');
        } else {
            //18位身份证需要验证最后一位校验位
            if (val.length == 18) {
                  val = val.split("");
                  //加权因子∑(ai×Wi)(mod 11)
                  let factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
                  //校验位
                  let parity = [1, 0, "X", 9, 8, 7, 6, 5, 4, 3, 2],
                sum = 0,
                ai = 0,
                wi = 0;
                  for (let i = 0; i < 17; i++) {
                    ai = val[i];
                    wi = factor[i];
                    sum += ai * wi;
                  }
                //   let last = parity[sum % 11];
                  if (parity[sum % 11] != val[17]) {
                    callback('校验位错误');
                  }
            }
            callback();
        }
    },

    validatePersonNumber (opt,val,callback){								//人数校验
        let re=regex.personNumber;
        if(!re.test(val)){
            callback(opt.msg);
        }else{
            if(val<=0){
                callback(opt.msg)
            }else {
                callback();
            }
        }
    },

    isEmail (str){                                                  //是否为邮箱
        let re=regex.email;
        let reSpace=/\s/;
        return re.test(str) && !reSpace.test(str);
    },
    isBankCard (str){                                               //是否为银行卡
        let re=/^\d{13,19}$/;
        return re.test(str);
    },
    isMobileNumber (str){                                           //是否为手机号
        let re=/^1\d{10}$/;
        return re.test(str);
    },
    isTelephoneNumber (str){                                        //是否为座机号
        let re=/^(\d{3,4}-)?\d{6,8}$/;
        return re.test(str);
    },
    isMoney (str){                                                  //是否为金额数值
        let re=/^\d+(\.\d{1,2}|\d+)?$/;
        return re.test(str);
    },
    hasSpecialWord (val){							//检测是否有表情包
        let re=regex.specialWord;
        if (re.test(val)) {
            return true;
        }else{
            return false;
        }
    },
    isSpaceVal(val) {                           	//验证值是否为空或者不可用
        return val == '' || val == undefined || val == null
    }
}
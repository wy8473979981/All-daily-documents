const _env ='zsj_uat'//"product_zsj" //dev product
let baseUrl, staticUrl;
if (_env == "uat"){
  baseUrl = "http://ystest.yueworld.cn/";
  staticUrl = "http://ystest.yueworld.cn/";
}else if(_env == "zsj_uat"){
  baseUrl = "http://zsjuat.yueworld.cn:8888/";
  staticUrl = "http://zsjuat.yueworld.cn:8888/";
}else if(_env == "df_uat"){
  baseUrl = "http://dfuat.yueworld.cn:58080/";
  staticUrl = "http://dfuat.yueworld.cn:58080/";
}else if(_env == "product_md"){
  baseUrl = "https://pms.mideazy.com/";
  staticUrl = "https://pms.mideazy.com/";
} else if (_env == "product_zsj") {
  baseUrl = "https://pms-manage.cmsk1979.com/";
  staticUrl = "https://pms-manage.cmsk1979.com/";
} else if (_env == "local") {
  baseUrl = "http://zsjuat2.yueworld.cn:8060/";//"http://localhost:9093/";
  staticUrl = "http://zsjuat2.yueworld.cn:8060/";
}

export default {
  env : _env,
  baseUrl : baseUrl,
  staticUrl : staticUrl,
  sign : "YUEWORLD2A72F53B39C"
}
const _env ="dev" //dev product
let baseUrl, staticUrl;
if(_env == "dev"){
  baseUrl = "https://pmstest.powerlong.com/";
  staticUrl = "https://pmstest.powerlong.com/";
}else if(_env == "product"){
  baseUrl = "https://pms.powerlong.com/";
  staticUrl = "https://pms.powerlong.com/";
} else if (_env == "local") {
  baseUrl = "http://10.10.136.45:9092/";
  staticUrl = "http://10.10.136.45:9092/";
}

export default {
  env : _env,
  baseUrl : baseUrl,
  staticUrl : staticUrl,
  sign : "YUEWORLD2A72F53B39C"
}
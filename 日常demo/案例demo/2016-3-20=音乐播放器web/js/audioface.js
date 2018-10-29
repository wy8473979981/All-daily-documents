//给所有的构造器函数的原型之上，添加一个继承功能
Function.prototype.extends = function(obj){
	for(var prop in obj){
		this.prototype[prop] = obj[prop];
	}
}
//构造器 参数：canvas:绘制曲谱的目标 meterNum:绘制曲谱的数目
function AudioFace(canvas,meterNum){
	this.canvas = document.getElementById(canvas);
	this.meterNum = meterNum||1;
	this.status = 0;//0:准备 1:播放中 2.暂停
	this._init();//初始化方法
}
AudioFace.prototype = {
	_init : function(){
		//音频上下文
		window.AudioContext = window.AudioContext || 
			window.webkitAudioContext || 
			window.mozAudioContext || 
			window.msAudioContext;
		//请求动画帧
		window.requestAnimationFrame = window.requestAnimationFrame ||
			window.webkitRequestAnimationFrame ||
			window.mozRequestAnimationFrame ||
			window.msRequestAnimationFrame;
		try {
			this.audioContext = new AudioContext();
		} catch (e) {
			console.log('你的浏览器不支持');
		}	
	},
	
};

AudioFace.extends({
	request : function(path){//通过ajax异步请求读取path对应的音乐文件
		var _this = this;
		var xhr = new XMLHttpRequest();
		xhr.open('GET', path, true);
		xhr.responseType = 'arraybuffer';
		xhr.onload = function(e) {
			_this.load(this.response);
		};
		xhr.send();
	},
	load : function(fileResult){//通过load加载，把ajax得到的arrayBuffer数据解码成音频数据
		var _this = this;
		this.audioContext.decodeAudioData(fileResult, function(buffer) { //解码成功则调用此函数，参数buffer为解码后得到的结果
		  _this.prepred(buffer);//把音频数据传入，内存中准备
		  _this.play(); //调用play进行下一步处理，此方法在后面定义并实现
	  }, function(e) { //这个是解码失败会调用的函数
		  console.log("文件解码失败:(");
	  });
	},
	//准备
	prepred : function(buffer){
		this.buffer = buffer;//保存音频数据
		this.startOffset = 0;//计算开始时间
		this.status = 0;//准备完毕的状态
		this.stop();
	},
	//播放
	play : function(){
		this.status = 1;//把状态改成正在播放
		this.startTime = this.audioContext.currentTime;//开始播放的当前时间
		this.startOffset = this.startOffset||0;
		this.audioBufferSouceNode = this.audioContext.createBufferSource();
		//将上一步解码得到的buffer数据赋值给source
		this.audioBufferSouceNode.buffer = this.buffer;
		this.audioBufferSouceNode.loop = true;
		this.analyser = this.audioContext.createAnalyser();
		//将source与分析器连接
		this.audioBufferSouceNode.connect(this.analyser);
		//将分析器与destination连接，这样才能形成到达扬声器的通路
		this.analyser.connect(this.audioContext.destination);
		//播放  this.buffer.duration 整个音频数据播放的秒数
		this.audioBufferSouceNode.start(0,this.startOffset % this.buffer.duration);
		//音乐响起后，把analyser传递到另一个方法开始绘制频谱图了，因为绘图需要的信息要从analyser里面获取
		
		this.onplay&&this.onplay(this.buffer.duration);
	},
	//暂停
	pause : function(){
	  this.stop();
	  this.status = 2;
		// 已经播放了多长时间
	  this.startOffset += this.audioContext.currentTime - this.startTime;
	  this.onpause&&this.onpause();
	},
	//停止
	stop : function(){
		this.status = 0;
		if(this.audioBufferSouceNode){
			this.audioBufferSouceNode.stop();
		}
	
	},
	//恢复播放
	resume : function(){
		this.play();
	} 
});
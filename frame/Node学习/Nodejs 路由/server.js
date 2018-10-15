var http = require("http");
var url = require("url");

function start(route) {
  function onRequest(request, response) {
    var pathname = url.parse(request.url).pathname;
    console.log("Request for " + pathname + " received.");

    route(pathname);

    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write("Hello World");
    response.end();
  }

  http.createServer(onRequest).listen(8888);
  console.log("Server has started.");
}

exports.start = start;

/*我们需要的所有数据都会包含在request对象中，该对象作为onRequest()回调函数的第一个参数传递。
但是为了解析这些数据，我们需要额外的Node.JS模块，它们分别是url和querystring模块。*/
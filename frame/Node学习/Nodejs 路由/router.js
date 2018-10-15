/*如你所见，这段代码什么也没干，不过对于现在来说这是应该的。在添加更多的逻辑以前，我们先来看看如何把路由和服务器整合起来。
我们的服务器应当知道路由的存在并加以有效利用。我们当然可以通过硬编码的方式将这一依赖项绑定到服务器上，
但是其它语言的编程经验告诉我们这会是一件非常痛苦的事，
因此我们将使用依赖注入的方式较松散地添加路由模块。*/


function route(pathname) {
  console.log("About to route a request for " + pathname);
}

exports.route = route;
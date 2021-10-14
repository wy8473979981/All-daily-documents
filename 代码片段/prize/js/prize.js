 function Prize(opts) {
  this.opts = {
    moves: $('.prize-swiper'),
    count: 30, // 滚动多少圈
    activeIndex: 1, // 中奖 下标
    images: [], // 奖品图片列表
    isWin: true, // 是否中奖
    completeNums: 0,
    top: 0,
    imageHeight: 170,
    end: function () { }   // 结束回调
  }
  for (var i in opts) {
    this.opts[i] = opts[i];
  }
  this.moveStance =  - this.opts.images.length * this.opts.imageHeight;
  this.startMove();
}

Prize.prototype = {
  init: function ($el, count, index) {
    var self = this;
    $el.animate({
      marginTop: self.moveStance
    }, 150, function () {
      $(this).css("margin-top", 0);
      if (count > 1) {
        $el.parent('.prize-images-content').addClass('slotMachineGradient');
        self.init($el, --count, index);
      }
      else {
        var marginTop = self.opts.top;
        if (!self.opts.isWin) {
          marginTop = -self.opts.top[index] * self.opts.imageHeight
        }
        $el.animate({
          marginTop: marginTop
        }, 200, "easeOutBounce");
        $el.parent('.prize-images-content').removeClass('slotMachineGradient');
        ++self.opts.completeNums;
        self.complete(self.opts.completeNums);
        return;
      }
    });

  },
  startMove: function () {
    var self = this;
    this.opts.top = this.getMarginTop();
    var len = this.opts.moves.length;
    for (var i = 0; i < len; i++) {
      (function (j) {
        setTimeout(function () {
          _init(j)
        }
          , j * 200);
      })(i);
    }
    function _init(i) {
      self.init(self.opts.moves.eq(i), 10, i)
    }
  },
  complete: function (completeNums) {
    var len = this.opts.moves.length;
    var self = this;
    if (completeNums != len) {
      return;
    }
    else {
      self.opts.end.call(self);
    }
  },
  getMarginTop() {
    var self = this;
    var len = this.opts.images.length;
    var top;
    if (this.opts.isWin) {
      top = -(this.opts.activeIndex * this.opts.imageHeight)
    }
    else {
      var arr = [];
      for (var i = 0; i < len; i++) {
        arr.push(i);
      }
      top = this.getRandom(arr);
    }
    return top;
  },
  getRandom: function (arr) {
    var top = [];
    var len = this.opts.moves.length; 
    for (var i = 0; i < len; i++) {
      top.push(arr[Math.floor(Math.random() * arr.length)]);
    }
    while (top[0] == top[1] && top[1] == top[2]) {
      top[2] = arr[Math.floor(Math.random() * arr.length)]
    }
    console.log(top);
    return top;
  }
}
var slideImages = [
  {
    src: "temp/price_1.png",
    name: "奖品1"
  },
  {
    src: "temp/price_2.png",
    name: "奖品2"
  },
  {
    src: "temp/price_3.png",
    name: "奖品3"
  },
  {
    src: "temp/price_4.png",
    name: "奖品4"
  },
  {
    src: "temp/price_5.png",
    name: "奖品5"
  },
  {
    src: "temp/price_6.png",
    name: "奖品6"
  },
  {
    src: "temp/price_7.png",
    name: "奖品7"
  }, 
]
function Slide() {
    var self = this;
    this.auto = true;
    this.slideImages = slideImages;
    this.len = this.slideImages.length;
    this.distance = 176;
    this.columns = Math.ceil(this.len / 3);
    this.index = 0;
    this.prizes = $('.prizes');
    this.prevBtn = this.prizes.find('.prev-btn');
    this.nextBtn = this.prizes.find('.next-btn');
    this.prizesList = this.prizes.find('.pirzes-list');
    this.prevBtn.on('click', function() {
      if(!$(this).hasClass('disabled')) {
        $(this).addClass('disabled');
        self.goto('prev');
      } 
       
    });
    this.nextBtn.on('click', function() {
      if(!$(this).hasClass('disabled')) {
        $(this).addClass('disabled');
        self.goto('next');
      }   
   });
    this.renderDom();
}

Slide.prototype = {
  renderDom: function() {
    var str = '';
    var self = this;
    this.slideImages.map(function(item) {
      str += ' <li class="prizes-item">' +
              '<img class="list-img" src="' + item.src + '" alt="">' +
              '<p class="prize-name one_line_hidden">' + item.name + '</p>' +
            '</li>';
    });
    this.prizesList.html(str);
    if(this.len > 3) {
      this.nextBtn.fadeIn('fast');
    }
    if(this.auto) {
      setInterval(function() {
        self.index = self.index >= (self.columns -1) ? -1 : self.index;
        // console.log(self.index, self.columns -1);
        self.nextBtn.click();
      }, 3000)
    }
  },
  goto: function(dir) {
    if(dir == 'next') {
      this.index++;
      if(this.index >= this.columns - 1) {
        this.nextBtn.fadeOut('fast');
      }
      else {
        this.nextBtn.fadeIn('fast');
      }
      if(this.index != 0) {
        this.prevBtn.fadeIn('fast')
      }
      else {
        this.prevBtn.fadeOut('fast');
      }   
      this.move(dir);
    }
    else if(dir == 'prev') {
      this.index--;
      if(this.index <= 0) {
        this.prevBtn.fadeOut('fast');
      }
      else {
        this.prevBtn.fadeIn('fast');
      }
      if(this.index != this.columns - 1) {
        this.nextBtn.fadeIn('fast');
      }
      else {
        this.nextBtn.fadeIn('fast');
      }
      this.move(dir);
    }   
  },
  move: function(dir) {
    var self = this;
    this.prizesList.animate({
      marginLeft: - self.index * self.distance * 3
    }, 200, "linear", function() {
      if (dir == 'next') {
        self.nextBtn.removeClass('disabled');
      }
      else if (dir == 'prev') {
        self.prevBtn.removeClass('disabled')
      }
    });
  }
}
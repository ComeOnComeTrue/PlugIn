(function () {
    // 初始化  
    function Init(options) {
        this.parent = options.parent;// 保存父元素
        this.images = options.images;// 存储 用用户要轮播的所用图片
        this.direction = options.direction || 'next';// 给轮播一个方向
        this.width = options.widht || $(this.parent).width();// 图片宽度
        this.height = options.height || $(this.parent).height();//图片高度
        this.autoTimer = options.autoTimer || 2000;//自动轮播时间
        this.nowIndex = options.nowIndex || 0;//当前展示图片的索引数
        this.lock = false;// 设置自动轮播的定时器
        this.timer = null;//锁
        this.imgNum = options.images.length;// 轮播图片的个数
        this.createDom(); // 渲染dom
        this.addCss(); // 加样式
        this.bindEvent(); // 时间结合
        this.autoMove();  // 自动播放
        this.changeIndex(); // 
    }

    // 创建轮播图内容 dom
    Init.prototype.createDom = function () {
        var imgContent = $('<ul class="imgContent"></ul>');
        var pointer = $('<div class="pointer"></div>');
        for (var i = 0; i < this.imgNum; i++) {
            $('<li><img src="' + this.images[i] + '"/></li>').appendTo(imgContent);//插图片内容
                $('<div class="dot"></div>').appendTo(pointer);
        }
        // 插入最后一张图片内容和第一张一样
        imgContent.append($('<li><img src="' + this.images[0] + '"/></li>'));
        $(this.parent).append(imgContent)
            .append($('<div class="btn left-btn"><i>&lt<i></div>'))
            .append($('<div class="btn right-btn"><i>&gt<i></div>'))
        $(this.parent).append(pointer)
    }
    // 添加初始化样式
    Init.prototype.addCss = function () {
        $(this.parent).css({
            position: 'relative',
            overflow: 'hidden',
        })
        $('.imgContent', this.parent).css({ // ul 样式
            position: 'absolute',
            left: 0,
            top: 0,
            width: this.width * (this.imgNum + 1),
            fontSize: 0,
        });
        $('.imgContent > li', this.parent).css({ // ul li 样式
            width: this.width,
            height: this.height,
            display: 'inline-block',
        });
        $('.imgContent > li > img', this.parent).css({
            width: ' 100%',
            height: '100%'
        });
        $('.btn', this.parent).css({
            position: 'absolute',
            width: 25,
            height: 35,
            backgroundColor: 'rgba(0,0,0,.3)',
            top: '50%',
            marginTop: '-25px',
            lineHeight: '35px',
            opacity: 0.5,
            // display: 'none',
            cursor: 'pointer',
        });
        $('.btn > i', this.parent).css({
            display: 'block',
            width: '100%',
            height: '100%',
            fontStyle: 'normal',
            fontSize: '24px',
            color: 'rgba(255, 255, 255, 0.8)',
        });
        $('.btn.left-btn', this.parent).css({
            borderRadius: '0 20px 20px 0',
            left: 0,
        });
        $('.btn.left-btn i', this.parent).css({
            marginLeft: 1,
        });
        $('.btn.right-btn', this.parent).css({
            borderRadius: '20px 0 0 20px',
            right: 0,
        });
        $('.btn.right-btn i', this.parent).css({
            marginLeft: 8,
        });
        $('.pointer', this.parent).css({
            position: 'absolute',
            left: '50%',
            marginLeft:-4 * (this.imgNum - 1),
            bottom: '10px',
        });
        $('.pointer > .dot', this.parent).css({ // 小红点
            display: 'inline-block',
            margin: '0 3px',
            width: 8,
            height: 8,
            borderRadius: '50%',
            backgroundColor: '#fff',
            cursor: 'pointer',
        });


    }

    Init.prototype.bindEvent = function () {
        var self = this;
        // 移入移出
        $(this.parent).hover(function () {
            $('.btn', self.parent).show(); // 显示
            clearInterval(self.timer);//移入 删除时间函数
        }, function () {
            $('.btn', self.parent).hide(); // 隐藏
            self.autoMove();
        });
        // 
        $('.btn', self.parent).hover(function () {
            $('.btn', self.parent).css({backgroundColor:'rgba(0,0,0,.8'})
        }, function () {
            $('.btn', self.parent).css({backgroundColor:'rgba(0,0,0,.3'})
        });
        
        // 点击按钮
        $(this.parent).on('click', '.btn', function (e) {
            // e.targer
            if ($(this).hasClass('left-btn')) {//看有没有
                self.move('prev');
            } else if ($(this).hasClass('right-btn')) {
                self.move('next');
            }
        });
        // 小红点对应切换图片
        $('.pointer', this.parent).on('mouseenter', '.dot', function () {
            self.move($(this).index());//获取索引

        })
    }

    // 图片对应移动
    Init.prototype.move = function (dir) {
        var self = this;
        if (this.lock) {
            return false;
        }
        if (dir == 'prev') {
            this.lock = true;
            if (this.nowIndex == 0) {
                this.nowIndex = this.imgNum;
                $('ul', this.parent).css('left', -this.nowIndex * this.width);
            }
            this.nowIndex--;
            $('ul', this.parent).animate({
                'left': -this.nowIndex * this.width
            }, 1000, function () {
                self.changeIndex();
                self.lock = false;
            });
        } else if (dir == 'next') {
            this.lock = true;
            if (this.nowIndex == this.imgNum) {
                this.nowIndex = 0;
                $('ul', this.parent).css('left', -this.nowIndex * this.width);
            }
            this.nowIndex++;
            $('ul', this.parent).animate({
                'left': -this.nowIndex * this.width
            }, 1000, function () {
                self.changeIndex();
                self.lock = false;
            });
        } else if (typeof dir == 'number') { // 点击红点 换图 
            this.lock = true;
            this.nowIndex = dir;
            $('ul', this.parent).animate({
                'left': -this.nowIndex * this.width
            }, 100, function () {
                self.changeIndex();
                self.lock = false;
            });
        }
    }
    // 加红点 小红点展示 
    Init.prototype.changeIndex = function () {
        //全部为白色
        $('.pointer > .dot', this.parent).css({ backgroundColor: 'rgba(255,255,255,.8)', width: 10, height: 10 });
        if (this.nowIndex == this.imgNum) {
            //第一个为红
            $('.pointer > .dot', this.parent).eq(0).css({ backgroundColor: 'red', width: 12, height: 12 });
        } else {
            //对应为红
            $('.pointer > .dot', this.parent).eq(this.nowIndex).css({ backgroundColor: 'red', width: 12, height: 12 });
        }
    }
    // 自动移动
    Init.prototype.autoMove = function () {
        var self = this;
        this.timer = setInterval(function () {
            self.move(self.direction); // left-right
        }, this.autoTimer)
    }

    $.fn.extend({
        swiper: function (options) {
            options.parent = this; // 得到参数
            new Init(options);
        },
    })

}());

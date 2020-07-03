
// 图片自动播放 + 点击切换
(function ($) {
    function Slider(ele, opt) {
        let d = { // 默认参数
            curDisplay: 0, // 中间图片的索引
            isAutoPlay: true, // 是否自动轮播
            interval: 2000, // 间隔时间
            width: '300px', // 图片宽
            height: '200px',// 图片高
        }
        this.opts = $.extend({}, d, opt);// 合并对象：d克隆opt

        this.wrap = ele;
        this.curDisplay = this.opts.curDisplay;// 当前展示的索引值
        this.isAutoPlay = this.opts.isAutoPlay;
        this.interval = this.opts.interval;
        this.width = this.opts.width;
        this.height = this.opts.height;
        this.$img = this.wrap.find('img');  // ele下面的所有图片
        this.imgLen = this.$img.length; // 图片长度
        this.timer = null;
        this.init();
    }

    Slider.prototype.init = function () {
        // 添加样式
        this.addCss();
        // 图片动画过渡效果
        this.initMove();
        // 自动轮播
        this.autoPlay();
        // 绑定事件
        this.bindEvent(); 
    }
    Slider.prototype.addCss = function (){
        $(this.wrap).css({
            position: 'relative',
            transformStyle: 'preserve-3d',
            perspective: '800px',
        });
        $(this.$img).css({
            position: 'absolute',
            width: this.width,
            height: this.height,
            left: 'calc(50% - 150px)',
            top: 'calc(50% - 100px)',
            borderRadius: '5px',
            transition: 'all 1s',
            cursor: 'pointer',
        });
    }
    // 实现图片分散 图片位置动画效果
    Slider.prototype.initMove = function () {
        let self = this;
        let hLen = Math.floor(self.imgLen / 2); // 取中间图片索引
        let lNum, rNum;
        for (let i = 0; i < hLen; i++) {
            // 中间图片往后的图片处理
            lNum = self.curDisplay - i - 1; // 倒数第一张和第二张索引 
            self.$img.eq(lNum).css({
                transform: `translateX(${-150 * (i + 1)}px) translateZ(${200 - i * 100}px) rotateY(30deg)`
            })
            // 中间图片往前的图片处理
            rNum = (self.curDisplay + i + 1) % this.imgLen; // 前面两张索引  
            self.$img.eq(rNum).css({
                transform: `translateX(${150 * (i + 1)}px) translateZ(${200 - i * 100}px) rotateY(-30deg)`
            })

        }
        // 中间图片处理
        self.$img.eq(self.curDisplay).css({
            transform: 'translateZ(300px)'
        })
    }
    Slider.prototype.bindEvent = function () {
        let self = this;
        self.$img.on('click', function() {
            console.log(1, this)
            self.curDisplay = $(this).index();
            self.initMove(); // 动画
        })
        
        $(this.wrap).hover(function() {
            clearInterval(self.timer);
        },function() {
            self.autoPlay();
        })
    }
    // 自动播放
    Slider.prototype.autoPlay = function () {
        if (this.isAutoPlay) {
            this.timer = setInterval(() => {
                if (this.curDisplay == this.imgLen - 1) {
                    this.curDisplay = 0;
                } else {
                    this.curDisplay++;
                }
                this.initMove(); // 动画
            }, this.interval)
        }
    }

    // jQuery扩展插件
    $.fn.extend({
        slider: function (options) {
            new Slider(this, options);
        }
    })
}(jQuery))
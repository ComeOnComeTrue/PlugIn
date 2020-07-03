(function (){

    function Init(options) {
        this.parent = options.parent;// 接受上一个参数
        this.key = options.key || 'callback'; // jsonp传递时key值 让后端返回带上的属性名
        this.jsonpCallback = options.jsonpCallback || ''; // jsonp传递时vul值 让后端返回带上的数据放在jsonpCallback里
        this.url = options.url;// 请求地址
        this.type = options.type;// 请求数据的类型
        this.inputWidth = options.inputWidth || $(this.parent).width() - 58;
        this.height = options.height || $(this.parent).height();
        this.fontSize = options.fontSize || 18;
        this.success = options.success;
        this.dataName = options.dataName;

        this.createDom();//创建
        this.addCss();
        this.bindEvent();
    }

    Init.prototype.createDom = function (){
        var oDiv = $('<div class="cj-input-content"></div>');
        var oInput = $('<input class="cj-input-search"/>');
        var oBtn = $('<button class="search-btn">搜索</button>');
        oDiv.append(oInput).append(oBtn).appendTo($(this.parent))
    }
    Init.prototype.addCss = function (){
        $('.cj-input-content', this.parent).css({
            width:'100%',
            height:'100%',
            display: 'flex',  // 弹性盒模型 用来布局
            justifyContent: 'center',// 主轴方向居中(x轴)
            alignItems: 'center',// 侧轴方向居中(x轴)
        });
        $('.cj-input-content > .cj-input-search', this.parent).css({
            width: this.inputWidth,
            height: this.height,
            fontSize: this.fontSize,
            border: '2px solid red',
            paddingLeft:15,
            outline:'none',
        });
        $('.cj-input-content > .search-btn', this.parent).css({
            width: 100,
            height: 6 + this.height,
            textAlign: 'center',
            fontSize: this.fontSize,
            border: 'none',
            color: '#fff',
            fontWeight: 700,
            background: 'linear-gradient(to right,#ff9000 0, #ff5000 100%)',
            borderRadius: '0 20px 20px 0',
            cursor: 'pointer',
        
        });
    }
    Init.prototype.bindEvent = function () {
        var self = this;
        $('.cj-input-content > .cj-input-search',this.parent).on('input',function (e) {
            $.ajax({
                type: self.type,
                url: self.url,
                // context:$('.cj-input-content',this.parent),
                data: self.dataName + '=' + $(this).val() + '&code=utf-8',//输入的数据
                success: self.success, //请求成功后调用
                dataType: 'jsonp',
                jsonp: self.key,
                jsonpCallback: self.jsonpCallback,//后端返回的
            })
        })
    }

    $.fn.extend({
        inputSearch: function (options) {
            options.parent = this; // 接受参数
            new Init(options);
        }
    })
}())
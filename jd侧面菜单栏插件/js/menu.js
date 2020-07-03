(function () {
    
    function Init(options) {

        this.parent = options.parent;
        this.data = options.data;
        this.createDom();
        this.addCss();
        this.bindEvent();
    }

    Init.prototype.createDom = function () {
        var menuList = $('<div class="menuList"></div>');
        var showMenu = $('<ul class="cateMenu"></ul>');
        for (var i = 0; i < this.data.length; i++){
            var dataContent = this.data[i];
            var menuContent = $('<div id="menuContent" class="menuContent" data-id="data_'+ i + '"></div>')
            var leftLi = $('<li class="leftLi"><a href="' + this.data[i].href +'">'+ this.data[i].name +'</a></li>').appendTo(showMenu);

            for (var j = 0;j < dataContent.detail.length; j++) {
                var itemRow = $('<ul class="itemRow"></ul>');
                var items = dataContent.detail[j].items;
                $('<li class="cateType"><a href="#">' + dataContent.detail[j].title +'&gt</a></li>').appendTo(itemRow);
                var itemsRight = $('<ul class="itemsRight"></ul>')

                    for (var k = 0; k < items.length; k++){
                        $('<li class="item"><a href="' + items[k].href +'">'+ items[k].name +'</a></li>').appendTo(itemsRight);
                    }

                itemRow.append(itemsRight).appendTo(menuContent);
            }
            menuContent.appendTo(leftLi);
        }
        menuList.append(showMenu).appendTo($(this.parent));
    }

    Init.prototype.addCss = function() {
        $('*',this.parent).css({
            padding: 0,
            margin: 0,
            listStyle:'none',
            textDecoration:'none',
            fontSize:12,
            color:'#666'
        });
        $('.menuList > .cateMenu', this.parent).css({
            position:'relative',
            width: 190,
            height: 470,
            backgroundColor:'#fefefe',
            zIndex:1000,
        });
        $('.menuList > .cateMenu > li', this.parent).css({
            widht: '100%',
            height: 26,
            lineHeight:'26px',
            textAlign: 'center'
        });
        $('.menuList > .cateMenu > li > .menuContent', this.parent).css({
            width: 998,
            height: 470,
            border:'4px solid #ddd',
            position: 'absolute',
            marginTop:10,
            left: 190,
            top: -13,
            textAlign: 'left',
            display:'none',
            backgroundColor:'#fff',
        });
        $('.itemRow > li', this.parent).css({
            display:'inline-block'
        });
        $('.itemRow > .itemsRight', this.parent).css({
            display:'inline-block',
            width: '100%',
            marginLeft: 70,
        });
        $('.itemRow > .itemsRight > .item', this.parent).css({
            display:'inline-block', 
            height:32,
            margin:'0 10px',
        });
        $('.itemRow > .itemsRight > .item > a', this.parent).css({
            borderLeft:'1px solid #ddd',
            padding:'0 10px',
        });
        $('.itemRow', this.parent).css({
            position:'relative',
            verticalAlign: 'top',
        });
        $('.itemRow > .cateType', this.parent).css({
            position: 'absolute',
            left: 0,
            top: 0,
            fontWeight:900,
            width: 70,
            textAlign: 'center'
        });



    }

    Init.prototype.bindEvent = function() {

        $('.cateMenu', this.parent).on('mouseenter','.leftLi', function (e) {
            
            $('.menuContent[data-id=data_'+ $(this).index() +']', this.parent).show();
        }).on('mouseleave','.leftLi', function (e) {

            $('.menuContent[data-id=data_'+ $(this).index() +']', this.parent).hide();
        })

        $('.menuList li a', this.parent).hover(function () {
            $(this).css({color:'#c81623',})
        },function () {
            $(this).css({color:'',})
        })

    }




    $.fn.extend({
        menu: function (options) {
            options.parent = this;
            new Init(options)
            
        }
    })

}());
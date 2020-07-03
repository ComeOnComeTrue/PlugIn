(function(root) {

    function createBannerArea(areaDom, options) {
        let imgArea = document.createElement("div"); // 图片区域的div
        let numberArea = document.createElement("div"); // 图片区域的div
        let curIndex = 0; // 当前图片索引
        let changeTimer = null; // 自动切换的计时器
        let changeDuration = 2000; // 2秒钟切换间隔
        let timer = null; // 动画计时器

        // 1. 创建区域显示图片
        initImgs();
        // 2. 创建区域，用于显示角标
        initNumvers();
        // 3. 设置状态
        setStatus();
        // 4. 自动切换
        aotuMove();

        /**
         * 创建图片区域
         */
        function initImgs() {
            imgArea.style.width = "100%";
            imgArea.style.height = "100%";
            imgArea.style.display = 'flex';
            imgArea.style.overflow = "hidden";
            for (let i = 0; i < options.length; i++) {
                const obj = options[i];
                const img = document.createElement('img');
                img.src = obj.imgUrl;
                img.style.width = "100%";
                img.style.height = "100%";
                img.style.marginLeft = '0';
                img.style.cursor = 'pointer';
                imgArea.appendChild(img);
            }
            imgArea.addEventListener("mouseenter", () => {
                clearInterval(changeTimer);
                changeTimer = null;
            })
            imgArea.addEventListener("mouseleave", () => {
                aotuMove();
            })
            areaDom.appendChild(imgArea);
        }
        /**
         * 创建小圆点角标区域
         */
        function initNumvers() {
            numberArea.style.textAlign = 'center';
            numberArea.style.marginTop = '-20px'
            for (let i = 0; i < options.length; i++) {
                const sp = document.createElement('span');
                sp.style.width = "12px";
                sp.style.height = "12px";
                sp.style.backgroundColor = "#ddd";
                sp.style.display = 'inline-block';
                sp.style.borderRadius = '50%';
                sp.style.marginRight = '8px';
                sp.style.cursor = 'pointer';
                sp.addEventListener('click', () => {
                    curIndex = i;
                    setStatus();
                })

                numberArea.appendChild(sp);
            }
            areaDom.appendChild(numberArea);
        }
        /**
         * 图片索引
         */
        function setStatus() {
            // 1. 圆圈背景原色
            for (let i = 0; i < numberArea.children.length; i++) {
                if(i === curIndex) {
                    // 当前显示的圆圈的样式
                    numberArea.children[i].style.backgroundColor = 'red';

                }else {
                    // 设置圆圈为普通状态
                    numberArea.children[i].style.backgroundColor = '#fff';
                }
                
            }

            // 2. 显示图片过渡效果
                // let targetMarginLeft = curIndex * -100;
                // imgArea.children[0].style.marginLeft = targetMarginLeft + '%';
            let start = parseInt( imgArea.children[0].style.marginLeft ); // 开始位置
            let end = curIndex * -100; // 结束位置
            let dis = end - start; // 距离 
            let duration = 500; // 距离要用到的时间
            let speed = dis / duration; // 一毫秒运行的距离

            if(timer){ // 如果之前有动画执行，先清除动画在执行
                clearInterval(timer);
            }

            timer = setInterval(() => { 
                start += speed * 20; // 每次加20毫秒移动的距离
                imgArea.children[0].style.marginLeft = start + '%';
                if(Math.abs(end - start) < 1) { // 当一张图片运动完，就清除定时器
                    imgArea.children[0].style.marginLeft = end + '%';
                    clearInterval(timer);
                }
            }, 20)
        }

        /**
         * 自动移动
         */
        function aotuMove() {
            if (changeTimer) {
                return;
            }
            changeTimer = setInterval(() => {
                if(curIndex === options.length - 1){
                    curIndex = 0;
                }else{
                    curIndex++;
                }
                setStatus();
            }, changeDuration);
        }


    }



    root.createBannerArea = createBannerArea;

}(window.banner || (window.banner = {})));

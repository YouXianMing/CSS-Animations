function setup() {
    'use strict';
}

function addEvent() {
    'use strict';

    var div = window.Element.ArrayFromClass("item-content")[0];
    div.check = false; // 是否点击了
    div.isAnimating = false; // 是否正在执行动画
    div.delayExcute = function () {
        div.isAnimating = false;
    };
    div.onclick = function () {

        var img = this.children[0],
            h2 = this.children[1];

        if (div.check === false && div.isAnimating === false) {

            div.check = true;

            // 过1秒后执行再将isAnimating设置成false
            div.isAnimating = true;
            Object.TimeoutExcute(this, 750);

            // 图片设置
            img.removeClassName("state-A-bg-image animation-state-B-bg-image");
            img.addClassName("animation-state-A-bg-image state-B-bg-image");

            // h2动画设置
            h2.removeClassName("animation-state-B-h2 state-A-h2");
            h2.addClassName("animation-state-A-h2 state-B-h2");

        } else if (div.check === true && div.isAnimating === false) {

            div.check = false;

            // 过1秒后执行再将isAnimating设置成false
            div.isAnimating = true;
            Object.TimeoutExcute(this, 750);

            // 图片设置
            img.removeClassName("state-B-bg-image animation-state-A-bg-image");
            img.addClassName("animation-state-B-bg-image state-A-bg-image");

            // h2动画设置
            h2.removeClassName("animation-state-A-h2 state-B-h2");
            h2.addClassName("animation-state-B-h2 state-A-h2");
        }
    };
}

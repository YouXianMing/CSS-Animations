/* 获取该对象的类名 */
function classNameOf(object) {
    'use strict';

    if (object instanceof Object) {

        return object.constructor.name;

    } else {

        return undefined;
    }
}


/*-------------------------------*/
/*<<<<<<<< StringUtility >>>>>>>>*/
/*-------------------------------*/

// 字符串实用操作
function StringUtility() {
    'use strict';
}

// 去除字符串两端空格
StringUtility.Trim = function (str) {
    'use strict';
    return str.replace(/^\s+|\s+$/g, "");
};

// 根据空格分割字符串成数组
StringUtility.SplitBySpace = function (str) {
    'use strict';
    return str.replace(/^\s+|\s+$/g, "").replace(/\s+/g, " ").split(" ");
};


/*------------------------------*/
/*<<<<<<<< ArrayUtility >>>>>>>>*/
/*------------------------------*/

// 数组实用操作
function ArrayUtility() {
    'use strict';
}

// 随机排序的回调
ArrayUtility.prototype.randomSort = function (a, b) {
    'use strict';
    return Math.random() > 0.5 ? -1 : 1;
};

// 数组去重
ArrayUtility.prototype.unique = function (arr) {
    'use strict';
    var ret = [],
        hash = {},
        i,
        item,
        key;
    for (i = 0; i < arr.length; i += 1) {

        item = arr[i];
        key = typeof (item) + item;
        if (hash[key] !== 1) {

            ret.push(item);
            hash[key] = 1;
        }
    }

    return ret;
};


/*-----------------------------*/
/*<<<<<<<< ArrayString >>>>>>>>*/
/*-----------------------------*/

// 一个处理字符串A与字符串B并集差集的类
function ArrayString(strA, strB) {
    'use strict';

    // [私有方法] 去掉重复的数据
    function arrUnique(array) {

        var ret = [],
            hash = {},
            i,
            item,
            key;

        for (i = 0; i < array.length; i += 1) {

            item = array[i];
            key = typeof (item) + item;
            if (hash[key] !== 1) {

                ret.push(item);
                hash[key] = 1;
            }
        }

        return ret;
    }

    // 去掉首尾空格,将中间的空格换成一个空格
    this.stringA = strA.replace(/^\s+|\s+$/g, "").replace(/\s+/g, " ");
    this.stringB = strB.replace(/^\s+|\s+$/g, "").replace(/\s+/g, " ");

    // 将字符串转换为数组,已去除重复的字符串
    this.arrayA = arrUnique(this.stringA.split(" "));
    this.arrayB = arrUnique(this.stringB.split(" "));

    // 数组A与数组B并集,并返回合并后的字符串
    this.union = function () {

        return arrUnique(this.arrayA.concat(this.arrayB)).join(" ");
    };

    // 数组A减去数组B,并返回合并后的字符串
    this.arrayASubtractionArrayB = function () {

        var m = {};
        this.arrayA.forEach(function (al) {
            m[al] = al;
        });
        this.arrayB.forEach(function (bl) {
            delete m[bl];
        });

        return Object.keys(m).join(" ");
    };

    // 数组B减去数组A,并返回合并后的字符串
    this.arrayBSubtractionArrayA = function () {

        var m = {};
        this.arrayB.forEach(function (al) {
            m[al] = al;
        });
        this.arrayA.forEach(function (bl) {
            delete m[bl];
        });

        return Object.keys(m).join(" ");
    };
}

// [类原型方法] 合并字符串(去重复)
ArrayString.prototype.Union = function (strA, strB) {
    'use strict';

    var obj = new ArrayString(strA, strB);
    return obj.union();
};

// [类原型方法] 合并字符串(去重复)
ArrayString.prototype.Subtraction = function (strA, strB) {
    'use strict';

    var obj = new ArrayString(strA, strB);
    return obj.arrayASubtractionArrayB();
};





/*====================================================================================*/
/*=================================== prototype注入 ===================================*/
/*====================================================================================*/




/* 数组重新排序 */
Array.prototype.randomSort = function () {
    'use strict';

    return this.sort(ArrayUtility.prototype.randomSort);
};

/* 添加新的class数组(可以重复添加) */
window.Element.prototype.addClassNameArray = function (list) {
    'use strict';

    this.className = ArrayString.prototype.Union(this.className, list.join(" "));
};

/* 添加新的class(可以重复添加) */
window.Element.prototype.addClassName = function (names) {
    'use strict';

    this.className = ArrayString.prototype.Union(this.className, names);
};

/* 移除class数组(可以重复移除) */
window.Element.prototype.removeClassNameArray = function (list) {
    'use strict';

    this.className = ArrayString.prototype.Subtraction(this.className, list.join(" "));
};

/* 移除class(可以重复移除) */
window.Element.prototype.removeClassName = function (names) {
    'use strict';

    this.className = ArrayString.prototype.Subtraction(this.className, names);
};

/* 根据id获取元素(调用此方法的时候已经设置好了id) */
window.Element.id = function (id) {
    'use strict';

    return document.getElementById(id);
};

/* 根据className获取元素列表 */
window.Element.ArrayFromClass = function (className) {
    'use strict';
    return document.getElementsByClassName(className);
};

/* 删除节点 */
window.Element.RemoveElement = function (nodeItem) {
    'use strict';

    if (nodeItem !== null) {

        var type = nodeItem.nodeType;
        if (type !== undefined && type === document.ELEMENT_NODE && nodeItem.parentNode !== null) {

            nodeItem.parentNode.removeChild(nodeItem);
        }
    }

    return nodeItem;
};

/* 延时执行,obj对象需要包含一个delayExcute的方法,解决this问题 */
Object.TimeoutExcute = function (obj, ms) {
    'use strict';

    setTimeout(function () {

        obj.delayExcute();

    }, ms);
};

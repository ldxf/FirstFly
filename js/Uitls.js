/**
 *工具
 */
Array.prototype.remove = function (obj) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] == obj) {
            this.splice(i, 1)
            return this;
        }
    }
}
Array.prototype.removeAll = function () {
    //清空数组 方法1
    this.splice(0, this.length);
    //清空数组 方法2
    // this.length=0;
    return this;
}

function Point(x, y) {
    this.x = x;
    this.y = y;
}

function IsCollided(obj1, obj2) {
    //判断两个物体都有，即不发子弹时不比较
    if (obj1 && obj2) {
        var cen1 = obj1.getCenter();
        var cen2 = obj2.getCenter();
//		console.log(cen1.x);
        return Math.abs(cen1.x - cen2.x) < (obj1.width + obj2.width) / 2
            && Math.abs(cen1.y - cen2.y) < (obj1.height + obj2.height) / 2;
    }
    return false;
}

function IsCollided2(obj1, obj2) {
    //判断两个物体都有，即不发子弹时不比较
    if (obj1 && obj2) {
        var cen1 = obj1.getCenter();
        var cen2 = obj2.getCenter2();
//		console.log(cen1.x);
        return Math.abs(cen1.x - cen2.x) < (obj1.width + obj2.width) / 2
            && Math.abs(cen1.y - cen2.y) < (obj1.height + obj2.height) / 2;
    }
    return false;
}

function logout() {
    if (confirm("你确定要退出游戏吗？是－选择确定，否-选择取消")) {
        // window.location.href="https://www.baidu.com";
        if (navigator.userAgent.indexOf("MSIE") > 0) {
            if (navigator.userAgent.indexOf("MSIE 6.0") > 0) {
                window.opener = null;
                window.close();
            } else {
                window.open('', '_top');
                window.top.close();
            }
        } else if (navigator.userAgent.indexOf("Firefox") > 0 || navigator.userAgent.indexOf("Presto") > 0) {
            window.location.href = 'about:blank ';
        } else if (navigator.userAgent.indexOf("Chrome") > 0) {
            open(location, '_self').close();
        } else {
            window.opener = null;
            window.open('', '_self', '');
            window.close();
        }
    }
}

//anchorpoints：贝塞尔基点
//pointsAmount：生成的点数
//return 路径点的Array
function CreateBezierPoints(anchorpoints, pointsAmount) {
    var points = [];
    for (var i = 0; i < pointsAmount; i++) {
        var point = MultiPointBezier(anchorpoints, i / pointsAmount);
        points.push(point);
    }
    return points;
}

function MultiPointBezier(points, t) {
    var len = points.length;
    var x = 0, y = 0;
    var erxiangshi = function (start, end) {
        var cs = 1, bcs = 1;
        while (end > 0) {
            cs *= start;
            bcs *= end;
            start--;
            end--;
        }
        return (cs / bcs);
    };
    for (var i = 0; i < len; i++) {
        var point = points[i];
        x += point.x * Math.pow((1 - t), (len - 1 - i)) * Math.pow(t, i) * (erxiangshi(len - 1, i));
        y += point.y * Math.pow((1 - t), (len - 1 - i)) * Math.pow(t, i) * (erxiangshi(len - 1, i));
    }
    return {x: x, y: y};
}

// 荆州战场局势图渲染
(function() {
    var COLORS = {
        wei:  '#c0392b',
        liu:  '#27ae60',
        sun:  '#2980b9',
        event:'#8e44ad',
    };

    var FACTION_NAMES = { wei: '曹魏', liu: '刘备/蜀', sun: '孙权/吴' };

    function getCoord(name) {
        var c = CITY_COORDS[name];
        if (c) return c;
        // 模糊匹配
        for (var k in CITY_COORDS) {
            if (k.indexOf(name) >= 0 || name.indexOf(k) >= 0) return CITY_COORDS[k];
        }
        return { x: 400, y: 400 };
    }

    // 渲染一张地图
    function renderMap(canvasId, data) {
        var canvas = document.getElementById(canvasId);
        if (!canvas) return;
        var ctx = canvas.getContext('2d');
        var W = canvas.width, H = canvas.height;

        // 绘制底图
        var img = new Image();
        img.onload = function() {
            ctx.drawImage(img, 0, 0, W, H);
            drawOverlay(ctx, data, W, H);
        };
        img.onerror = function() {
            // 如果底图加载失败，画灰色背景
            ctx.fillStyle = '#3b2f2f';
            ctx.fillRect(0, 0, W, H);
            drawOverlay(ctx, data, W, H);
        };
        img.src = 'assets/jingzhou_map.png';
    }

    function drawOverlay(ctx, data, W, H) {
        // 画淡色势力范围（可选，简单处理）
        // 标注各方驻军
        drawFactionMarkers(ctx, data.wei, 'wei', W, H);
        drawFactionMarkers(ctx, data.liu, 'liu', W, H);
        drawFactionMarkers(ctx, data.sun, 'sun', W, H);

        // 画事件箭头/标记
        drawEvents(ctx, data.events || [], W, H);

        // 图例
        drawLegend(ctx, W, H);
    }

    function drawFactionMarkers(ctx, forces, faction, W, H) {
        if (!forces || forces.length === 0) return;
        var color = COLORS[faction];

        forces.forEach(function(f) {
            var coord = getCoord(f.loc);
            if (!coord) return;
            var x = coord.x, y = coord.y;

            // 画半透明外圈
            ctx.beginPath();
            ctx.arc(x, y, 18, 0, Math.PI * 2);
            ctx.fillStyle = color + '40';
            ctx.fill();

            // 画实心圆
            ctx.beginPath();
            ctx.arc(x, y, 7, 0, Math.PI * 2);
            ctx.fillStyle = color;
            ctx.fill();
            ctx.strokeStyle = '#fff';
            ctx.lineWidth = 2;
            ctx.stroke();

            // 画方向标记（魏在上=红，刘在左=绿，吴在右=蓝，稍微偏移避免重叠）
            var dx = 0, dy = -22;
            if (faction === 'wei') { dx = -8; dy = -22; }
            else if (faction === 'liu') { dx = 8; dy = -22; }
            else if (faction === 'sun') { dx = 0; dy = -28; }

            // 标注名称+兵力
            ctx.save();
            ctx.font = 'bold 11px "IBMPlexSerif", "Noto Serif CJK SC", serif';
            ctx.fillStyle = '#fff';
            ctx.strokeStyle = '#000';
            ctx.lineWidth = 3;
            ctx.textAlign = 'center';
            var label1 = f.gen ? f.gen.split('·')[0] : '';
            if (label1.length > 6) label1 = label1.slice(0, 6);
            var label2 = f.total ? f.total + '万' : '';
            ctx.strokeText(label1, x + dx, y + dy);
            ctx.fillStyle = color;
            ctx.fillText(label1, x + dx, y + dy);
            if (label2) {
                ctx.font = '10px "IBMPlexSerif", serif';
                ctx.strokeText(label2, x + dx, y + dy + 13);
                ctx.fillStyle = '#333';
                ctx.fillText(label2, x + dx, y + dy + 13);
            }
            ctx.restore();
        });
    }

    function drawEvents(ctx, events, W, H) {
        // 事件标注可以简单处理为紫色标记在地图中心
    }

    function drawLegend(ctx, W, H) {
        var lx = 15, ly = H - 55;
        ctx.fillStyle = 'rgba(255,255,255,0.85)';
        ctx.strokeStyle = '#999';
        ctx.lineWidth = 1;
        roundRect(ctx, lx, ly, 170, 50, 6, true, true);

        var factions = [['wei', '曹魏'], ['liu', '刘备/蜀'], ['sun', '孙权/吴']];
        ctx.font = 'bold 12px "IBMPlexSerif", serif';
        factions.forEach(function(f, i) {
            var fx = lx + 15, fy = ly + 18 + i * 14;
            ctx.beginPath();
            ctx.arc(fx, fy, 5, 0, Math.PI * 2);
            ctx.fillStyle = COLORS[f[0]];
            ctx.fill();
            ctx.fillStyle = '#222';
            ctx.textAlign = 'left';
            ctx.fillText(f[1], fx + 10, fy + 4);
        });
    }

    function roundRect(ctx, x, y, w, h, r, fill, stroke) {
        ctx.beginPath();
        ctx.moveTo(x + r, y);
        ctx.lineTo(x + w - r, y);
        ctx.quadraticCurveTo(x + w, y, x + w, y + r);
        ctx.lineTo(x + w, y + h - r);
        ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
        ctx.lineTo(x + r, y + h);
        ctx.quadraticCurveTo(x, y + h, x, y + h - r);
        ctx.lineTo(x, y + r);
        ctx.quadraticCurveTo(x, y, x + r, y);
        ctx.closePath();
        if (fill) ctx.fill();
        if (stroke) ctx.stroke();
    }

    // 暴露全局
    window.JZMap = { renderMap: renderMap };
})();

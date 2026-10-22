// 荆州战场局势图渲染 —— CSS背景 + Canvas叠加层
(function() {
    var COLORS = {
        wei:  '#c0392b',
        liu:  '#27ae60',
        sun:  '#2980b9',
    };

    function getCoord(name) {
        var c = CITY_COORDS[name];
        if (c) return c;
        for (var k in CITY_COORDS) {
            if (k.indexOf(name) >= 0 || name.indexOf(k) >= 0) return CITY_COORDS[k];
        }
        return { x: 400, y: 400 };
    }

    function renderMap(canvasId, data) {
        var canvas = document.getElementById(canvasId);
        if (!canvas) return;
        var ctx = canvas.getContext('2d');
        var W = canvas.width, H = canvas.height;

        // 清空
        ctx.clearRect(0, 0, W, H);

        // 画叠加层（底图已通过CSS设为background-image）
        drawFactionMarkers(ctx, data.wei, 'wei');
        drawFactionMarkers(ctx, data.liu, 'liu');
        drawFactionMarkers(ctx, data.sun, 'sun');
        drawLegend(ctx, W, H);
    }

    function drawFactionMarkers(ctx, forces, faction) {
        if (!forces || forces.length === 0) return;
        var color = COLORS[faction];

        forces.forEach(function(f) {
            var coord = getCoord(f.loc);
            if (!coord) return;
            var x = coord.x, y = coord.y;

            // 半透明外圈光晕
            ctx.beginPath();
            ctx.arc(x, y, 20, 0, Math.PI * 2);
            var grad = ctx.createRadialGradient(x, y, 0, x, y, 20);
            grad.addColorStop(0, color + '60');
            grad.addColorStop(1, color + '00');
            ctx.fillStyle = grad;
            ctx.fill();

            // 实心圆
            ctx.beginPath();
            ctx.arc(x, y, 8, 0, Math.PI * 2);
            ctx.fillStyle = color;
            ctx.fill();
            ctx.strokeStyle = '#fff';
            ctx.lineWidth = 2;
            ctx.stroke();

            // 偏移方向避免重叠
            var dx = 0, dy = -26;
            if (faction === 'wei') { dx = -10; dy = -26; }
            else if (faction === 'liu') { dx = 10; dy = -26; }
            else if (faction === 'sun') { dx = 0; dy = -32; }

            var label1 = f.gen ? f.gen.split('·')[0] : '';
            if (label1.length > 6) label1 = label1.slice(0, 6);
            var label2 = f.total ? f.total + '万' : '';

            // 画白色描边 + 彩色文字
            ctx.font = 'bold 12px "Noto Serif CJK SC", "IBMPlexSerif", serif';
            ctx.textAlign = 'center';
            ctx.lineJoin = 'round';
            ctx.miterLimit = 2;

            ctx.strokeStyle = '#fff';
            ctx.lineWidth = 4;
            ctx.strokeText(label1, x + dx, y + dy);
            ctx.fillStyle = color;
            ctx.fillText(label1, x + dx, y + dy);

            if (label2) {
                ctx.font = '11px "IBMPlexSerif", serif';
                ctx.strokeStyle = '#fff';
                ctx.lineWidth = 4;
                ctx.strokeText(label2, x + dx, y + dy + 14);
                ctx.fillStyle = '#333';
                ctx.fillText(label2, x + dx, y + dy + 14);
            }
        });
    }

    function drawLegend(ctx, W, H) {
        var lx = 15, ly = H - 58;
        // 半透明白底框
        ctx.fillStyle = 'rgba(255,255,255,0.9)';
        ctx.strokeStyle = '#999';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(lx + 6, ly);
        ctx.lineTo(lx + 174, ly);
        ctx.quadraticCurveTo(lx + 180, ly, lx + 180, ly + 6);
        ctx.lineTo(lx + 180, ly + 50);
        ctx.quadraticCurveTo(lx + 180, ly + 56, lx + 174, ly + 56);
        ctx.lineTo(lx + 6, ly + 56);
        ctx.quadraticCurveTo(lx, ly + 56, lx, ly + 50);
        ctx.lineTo(lx, ly + 6);
        ctx.quadraticCurveTo(lx, ly, lx + 6, ly);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        var factions = [['wei', '曹魏'], ['liu', '刘备/蜀'], ['sun', '孙权/吴']];
        ctx.font = 'bold 12px "IBMPlexSerif", serif';
        factions.forEach(function(f, i) {
            var fx = lx + 15, fy = ly + 18 + i * 14;
            ctx.beginPath();
            ctx.arc(fx, fy, 5, 0, Math.PI * 2);
            ctx.fillStyle = COLORS[f[0]];
            ctx.fill();
            ctx.strokeStyle = '#fff';
            ctx.lineWidth = 1.5;
            ctx.stroke();
            ctx.fillStyle = '#222';
            ctx.textAlign = 'left';
            ctx.fillText(f[1], fx + 10, fy + 4);
        });
    }

    window.JZMap = { renderMap: renderMap };
})();

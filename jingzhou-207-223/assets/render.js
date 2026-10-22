// 荆州战场局势图渲染 —— 箭头+战役标记+驻军
(function() {
    var COLORS = {
        wei:   '#c0392b',
        liu:   '#27ae60',
        sun:   '#2980b9',
        naval: '#1a5276',
        cav:   '#922b21',
    };

    function getCoord(name) {
        var c = CITY_COORDS[name];
        if (c) return c;
        for (var k in CITY_COORDS) {
            if (k.indexOf(name) >= 0 || name.indexOf(k) >= 0) return CITY_COORDS[k];
        }
        return null;
    }

    function renderMap(canvasId, data) {
        var canvas = document.getElementById(canvasId);
        if (!canvas) return;
        var ctx = canvas.getContext('2d');
        var W = canvas.width, H = canvas.height;

        ctx.clearRect(0, 0, W, H);

        // 先画箭头（在驻军点下面）
        (data.arrows || []).forEach(function(a) { drawArrow(ctx, a); });

        // 再画驻军点
        drawFactionMarkers(ctx, data.wei, 'wei');
        drawFactionMarkers(ctx, data.liu, 'liu');
        drawFactionMarkers(ctx, data.sun, 'sun');

        // 战役标记（在驻军点上面）
        (data.battles || []).forEach(function(b) { drawBattle(ctx, b); });

        drawLegend(ctx, W, H);
    }

    function drawArrow(ctx, a) {
        var from = getCoord(a.from);
        var to = getCoord(a.to);
        if (!from || !to) return;

        var color = COLORS[a.faction] || '#333';
        // 不同 kind 不同线型
        var dashed = a.dashed;
        if (dashed) ctx.setLineDash([6, 4]);

        // 画带一定弧度的曲线箭头（用二次贝塞尔，控制点在连线垂直方向偏移）
        var dx = to.x - from.x, dy = to.y - from.y;
        var midX = (from.x + to.x) / 2;
        var midY = (from.y + to.y) / 2;
        // 垂直方向偏移 25px
        var len = Math.sqrt(dx * dx + dy * dy) || 1;
        var offX = -dy / len * 25;
        var offY = dx / len * 25;
        // 水军和骑兵换偏移方向，稍微错开
        if (a.kind === 'naval') { offX *= -1.2; offY *= -1.2; }
        if (a.kind === 'cav')   { offX *= 1.3;  offY *= 1.3; }

        var ctrlX = midX + offX;
        var ctrlY = midY + offY;

        ctx.beginPath();
        ctx.moveTo(from.x, from.y);
        ctx.quadraticCurveTo(ctrlX, ctrlY, to.x, to.y);
        ctx.strokeStyle = color;
        ctx.lineWidth = 2.2;
        ctx.stroke();
        ctx.setLineDash([]);

        // 箭头头部（在曲线靠近终点的位置）
        // 先在终点前一点点的方向上画
        var t = 0.92;
        var hx = (1-t)*(1-t)*from.x + 2*(1-t)*t*ctrlX + t*t*to.x;
        var hy = (1-t)*(1-t)*from.y + 2*(1-t)*t*ctrlY + t*t*to.y;
        // 切线方向
        var tx = 2*(1-t)*(ctrlX-from.x) + 2*t*(to.x-ctrlX);
        var ty = 2*(1-t)*(ctrlY-from.y) + 2*t*(to.y-ctrlY);
        var tlen = Math.sqrt(tx*tx + ty*ty) || 1;
        ctx.save();
        ctx.translate(hx, hy);
        ctx.rotate(Math.atan2(ty, tx));
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(-14, -7);
        ctx.lineTo(-10, 0);
        ctx.lineTo(-14, 7);
        ctx.closePath();
        ctx.fill();
        ctx.restore();

        // 箭头标签（写在控制点附近）
        if (a.label) {
            ctx.save();
            ctx.font = 'bold 11px "Noto Serif CJK SC", "IBMPlexSerif", serif';
            ctx.textAlign = 'center';
            ctx.fillStyle = color;
            ctx.strokeStyle = '#fff';
            ctx.lineWidth = 3;
            var labelX = ctrlX;
            var labelY = ctrlY - 4;
            ctx.strokeText(a.label, labelX, labelY);
            ctx.fillText(a.label, labelX, labelY);
            ctx.restore();
        }
    }

    function drawBattle(ctx, b) {
        var c = getCoord(b.loc);
        if (!c) return;

        // 画一个大的五角星或者交叉刀剑图标
        var x = c.x, y = c.y;

        // 红色圆形底（更醒目）
        ctx.beginPath();
        ctx.arc(x, y, 18, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(192, 57, 43, 0.92)';
        ctx.fill();
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 2;
        ctx.stroke();

        // 画交叉刀剑（两笔 X 形）
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 2.5;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(x - 9, y - 9); ctx.lineTo(x + 9, y + 9);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(x + 9, y - 9); ctx.lineTo(x - 9, y + 9);
        ctx.stroke();
        // 刀柄小横线
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(x - 12, y - 6); ctx.lineTo(x - 6, y - 12);
        ctx.moveTo(x + 12, y - 6); ctx.lineTo(x + 6, y - 12);
        ctx.moveTo(x - 12, y + 6); ctx.lineTo(x - 6, y + 12);
        ctx.moveTo(x + 12, y + 6); ctx.lineTo(x + 6, y + 12);
        ctx.stroke();

        // 战役名（在标记下方）
        if (b.name) {
            ctx.save();
            ctx.font = 'bold 12px "Noto Serif CJK SC", serif';
            ctx.textAlign = 'center';
            ctx.fillStyle = '#fff';
            ctx.strokeStyle = '#8b0000';
            ctx.lineWidth = 3;
            var ly = y + 32;
            ctx.strokeText(b.name, x, ly);
            ctx.fillText(b.name, x, ly);
            ctx.restore();
        }
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

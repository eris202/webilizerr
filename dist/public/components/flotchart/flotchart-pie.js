/**
 * @module       Floatchart pie plugin
 * @author       IOLA and Ole Laursen
 * @see          https://github.com/flot/flot
 * @see          http://www.flotcharts.org/
 * @copyright    2007-2014 IOLA and Ole Laursen.
 * @license      MIT
 * @requires     script: floatchart
 */
!function (e) { function i(i) { function r(i, s, t) { y || (y = !0, b = i.getCanvas(), w = e(b).parent(), k = i.getOptions(), i.setData(a(i.getData()))); } function a(i) { var s, t, r = 0, a = 0, l = 0, n = k.series.pie.combine.color, o = []; for (s = 0; s < i.length; ++s)
    t = i[s].data, e.isArray(t) && 1 === t.length && (t = t[0]), e.isArray(t) ? !isNaN(parseFloat(t[1])) && isFinite(t[1]) ? t[1] = +t[1] : t[1] = 0 : t = !isNaN(parseFloat(t)) && isFinite(t) ? [1, +t] : [1, 0], i[s].data = [t]; for (s = 0; s < i.length; ++s)
    r += i[s].data[0][1]; for (s = 0; s < i.length; ++s)
    t = i[s].data[0][1], t / r <= k.series.pie.combine.threshold && (a += t, l++, n || (n = i[s].color)); for (s = 0; s < i.length; ++s)
    t = i[s].data[0][1], (2 > l || t / r > k.series.pie.combine.threshold) && o.push(e.extend(i[s], { data: [[1, t]], color: i[s].color, label: i[s].label, angle: t * Math.PI * 2 / r, percent: t / (r / 100) })); return l > 1 && o.push({ data: [[1, a]], color: n, label: k.series.pie.combine.label, angle: a * Math.PI * 2 / r, percent: a / (r / 100) }), o; } function l(i, r) { function a() { m.clearRect(0, 0, p, h), w.children().filter(".pieLabel, .pieLabelBackground").remove(); } function l() { var e = k.series.pie.shadow.left, i = k.series.pie.shadow.top, s = 10, t = k.series.pie.shadow.alpha, r = k.series.pie.radius > 1 ? k.series.pie.radius : M * k.series.pie.radius; if (!(r >= p / 2 - e || r * k.series.pie.tilt >= h / 2 - i || s >= r)) {
    m.save(), m.translate(e, i), m.globalAlpha = t, m.fillStyle = "#000", m.translate(P, A), m.scale(1, k.series.pie.tilt);
    for (var a = 1; s >= a; a++)
        m.beginPath(), m.arc(0, 0, r, 0, 2 * Math.PI, !1), m.fill(), r -= a;
    m.restore();
} } function o() { function i(e, i, s) { 0 >= e || isNaN(e) || (s ? m.fillStyle = i : (m.strokeStyle = i, m.lineJoin = "round"), m.beginPath(), Math.abs(e - 2 * Math.PI) > 1e-9 && m.moveTo(0, 0), m.arc(0, 0, a, l, l + e / 2, !1), m.arc(0, 0, a, l + e / 2, l + e, !1), m.closePath(), l += e, s ? m.fill() : m.stroke()); } function s() { function i(i, s, r) { if (0 === i.data[0][1])
    return !0; var a, l = k.legend.labelFormatter, n = k.series.pie.label.formatter; a = l ? l(i.label, i) : i.label, n && (a = n(a, i)); var o = (s + i.angle + s) / 2, g = P + Math.round(Math.cos(o) * t), c = A + Math.round(Math.sin(o) * t) * k.series.pie.tilt, u = "<span class='pieLabel' id='pieLabel" + r + "' style='position:absolute;top:" + c + "px;left:" + g + "px;'>" + a + "</span>"; w.append(u); var d = w.children("#pieLabel" + r), f = c - d.height() / 2, v = g - d.width() / 2; if (d.css("top", f), d.css("left", v), 0 - f > 0 || 0 - v > 0 || h - (f + d.height()) < 0 || p - (v + d.width()) < 0)
    return !1; if (0 !== k.series.pie.label.background.opacity) {
    var b = k.series.pie.label.background.color;
    null == b && (b = i.color);
    var M = "top:" + f + "px;left:" + v + "px;";
    e("<div class='pieLabelBackground' style='position:absolute;width:" + d.width() + "px;height:" + d.height() + "px;" + M + "background-color:" + b + ";'></div>").css("opacity", k.series.pie.label.background.opacity).insertBefore(d);
} return !0; } for (var s = r, t = k.series.pie.label.radius > 1 ? k.series.pie.label.radius : M * k.series.pie.label.radius, a = 0; a < c.length; ++a) {
    if (c[a].percent >= 100 * k.series.pie.label.threshold && !i(c[a], s, a))
        return !1;
    s += c[a].angle;
} return !0; } var t, r = Math.PI * k.series.pie.startAngle, a = k.series.pie.radius > 1 ? k.series.pie.radius : M * k.series.pie.radius; m.save(), m.translate(P, A), m.scale(1, k.series.pie.tilt), m.save(); var l = r; for (t = 0; t < c.length; ++t)
    c[t].startAngle = l, i(c[t].angle, c[t].color, !0); if (m.restore(), k.series.pie.stroke.width > 0) {
    for (m.save(), m.lineWidth = k.series.pie.stroke.width, l = r, t = 0; t < c.length; ++t)
        i(c[t].angle, k.series.pie.stroke.color, !1);
    m.restore();
} return n(m), m.restore(), k.series.pie.label.show ? s() : !0; } if (w) {
    var p = i.getPlaceholder().width(), h = i.getPlaceholder().height(), g = w.children().filter(".legend").children().width() || 0;
    m = r, y = !1, M = Math.min(p, h / k.series.pie.tilt) / 2, A = h / 2 + k.series.pie.offset.top, P = p / 2, "auto" === k.series.pie.offset.left ? (k.legend.position.match("w") ? P += g / 2 : P -= g / 2, M > P ? P = M : P > p - M && (P = p - M)) : P += k.series.pie.offset.left;
    var c = i.getData(), u = 0;
    do
        u > 0 && (M *= t), u += 1, a(), k.series.pie.tilt <= .8 && l();
    while (!o() && s > u);
    u >= s && (a(), w.prepend("<div class='error'>Could not draw pie with labels contained inside canvas</div>")), i.setSeries && i.insertLegend && (i.setSeries(c), i.insertLegend());
} } function n(e) { if (k.series.pie.innerRadius > 0) {
    e.save();
    var i = k.series.pie.innerRadius > 1 ? k.series.pie.innerRadius : M * k.series.pie.innerRadius;
    e.globalCompositeOperation = "destination-out", e.beginPath(), e.fillStyle = k.series.pie.stroke.color, e.arc(0, 0, i, 0, 2 * Math.PI, !1), e.fill(), e.closePath(), e.restore(), e.save(), e.beginPath(), e.strokeStyle = k.series.pie.stroke.color, e.arc(0, 0, i, 0, 2 * Math.PI, !1), e.stroke(), e.closePath(), e.restore();
} } function o(e, i) { for (var s = !1, t = -1, r = e.length, a = r - 1; ++t < r; a = t)
    (e[t][1] <= i[1] && i[1] < e[a][1] || e[a][1] <= i[1] && i[1] < e[t][1]) && i[0] < (e[a][0] - e[t][0]) * (i[1] - e[t][1]) / (e[a][1] - e[t][1]) + e[t][0] && (s = !s); return s; } function p(e, s) { for (var t, r, a = i.getData(), l = i.getOptions(), n = l.series.pie.radius > 1 ? l.series.pie.radius : M * l.series.pie.radius, p = 0; p < a.length; ++p) {
    var h = a[p];
    if (h.pie.show) {
        if (m.save(), m.beginPath(), m.moveTo(0, 0), m.arc(0, 0, n, h.startAngle, h.startAngle + h.angle / 2, !1), m.arc(0, 0, n, h.startAngle + h.angle / 2, h.startAngle + h.angle, !1), m.closePath(), t = e - P, r = s - A, m.isPointInPath) {
            if (m.isPointInPath(e - P, s - A))
                return m.restore(), { datapoint: [h.percent, h.data], dataIndex: 0, series: h, seriesIndex: p };
        }
        else {
            var g = n * Math.cos(h.startAngle), c = n * Math.sin(h.startAngle), u = n * Math.cos(h.startAngle + h.angle / 4), d = n * Math.sin(h.startAngle + h.angle / 4), f = n * Math.cos(h.startAngle + h.angle / 2), v = n * Math.sin(h.startAngle + h.angle / 2), b = n * Math.cos(h.startAngle + h.angle / 1.5), w = n * Math.sin(h.startAngle + h.angle / 1.5), k = n * Math.cos(h.startAngle + h.angle), y = n * Math.sin(h.startAngle + h.angle), I = [[0, 0], [g, c], [u, d], [f, v], [b, w], [k, y]], x = [t, r];
            if (o(I, x))
                return m.restore(), { datapoint: [h.percent, h.data], dataIndex: 0, series: h, seriesIndex: p };
        }
        m.restore();
    }
} return null; } function h(e) { c("plothover", e); } function g(e) { c("plotclick", e); } function c(e, s) { var t = i.offset(), r = parseInt(s.pageX - t.left), a = parseInt(s.pageY - t.top), l = p(r, a); if (k.grid.autoHighlight)
    for (var n = 0; n < I.length; ++n) {
        var o = I[n];
        o.auto !== e || l && o.series === l.series || d(o.series);
    } l && u(l.series, e); var h = { pageX: s.pageX, pageY: s.pageY }; w.trigger(e, [h, l]); } function u(e, s) { var t = f(e); -1 === t ? (I.push({ series: e, auto: s }), i.triggerRedrawOverlay()) : s || (I[t].auto = !1); } function d(e) { null == e && (I = [], i.triggerRedrawOverlay()); var s = f(e); -1 !== s && (I.splice(s, 1), i.triggerRedrawOverlay()); } function f(e) { for (var i = 0; i < I.length; ++i) {
    var s = I[i];
    if (s.series === e)
        return i;
} return -1; } function v(e, i) { function s(e) { e.angle <= 0 || isNaN(e.angle) || (i.fillStyle = "rgba(255, 255, 255, " + t.series.pie.highlight.opacity + ")", i.beginPath(), Math.abs(e.angle - 2 * Math.PI) > 1e-9 && i.moveTo(0, 0), i.arc(0, 0, r, e.startAngle, e.startAngle + e.angle / 2, !1), i.arc(0, 0, r, e.startAngle + e.angle / 2, e.startAngle + e.angle, !1), i.closePath(), i.fill()); } var t = e.getOptions(), r = t.series.pie.radius > 1 ? t.series.pie.radius : M * t.series.pie.radius; i.save(), i.translate(P, A), i.scale(1, t.series.pie.tilt); for (var a = 0; a < I.length; ++a)
    s(I[a].series); n(i), i.restore(); } var b = null, w = null, k = null, M = null, P = null, A = null, y = !1, m = null, I = []; i.hooks.processOptions.push(function (e, i) { i.series.pie.show && (i.grid.show = !1, "auto" === i.series.pie.label.show && (i.legend.show ? i.series.pie.label.show = !1 : i.series.pie.label.show = !0), "auto" === i.series.pie.radius && (i.series.pie.label.show ? i.series.pie.radius = .75 : i.series.pie.radius = 1), i.series.pie.tilt > 1 ? i.series.pie.tilt = 1 : i.series.pie.tilt < 0 && (i.series.pie.tilt = 0)); }), i.hooks.bindEvents.push(function (e, i) { var s = e.getOptions(); s.series.pie.show && (s.grid.hoverable && i.unbind("mousemove").mousemove(h), s.grid.clickable && i.unbind("click").click(g)); }), i.hooks.processDatapoints.push(function (e, i, s, t) { var a = e.getOptions(); a.series.pie.show && r(e, i, s, t); }), i.hooks.drawOverlay.push(function (e, i) { var s = e.getOptions(); s.series.pie.show && v(e, i); }), i.hooks.draw.push(function (e, i) { var s = e.getOptions(); s.series.pie.show && l(e, i); }); } var s = 10, t = .95, r = { series: { pie: { show: !1, radius: "auto", innerRadius: 0, startAngle: 1.5, tilt: 1, shadow: { left: 5, top: 15, alpha: .02 }, offset: { top: 0, left: "auto" }, stroke: { color: "#fff", width: 1 }, label: { show: "auto", formatter: function (e, i) { return "<div style='font-size:x-small;text-align:center;padding:2px;color:" + i.color + ";'>" + e + "<br/>" + Math.round(i.percent) + "%</div>"; }, radius: 1, background: { color: null, opacity: 0 }, threshold: 0 }, combine: { threshold: -1, color: null, label: "Other" }, highlight: { opacity: .5 } } } }; e.plot.plugins.push({ init: i, options: r, name: "pie", version: "1.1" }); }(jQuery);
//# sourceMappingURL=flotchart-pie.js.map
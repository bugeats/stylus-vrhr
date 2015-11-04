var test = require('tape');
var stylus = require('stylus')
var fs = require('fs');

var vrhr = require('../index.js');

peq('vr(2)',        '40px',   'int units basic conversion');
peq('vr(21/34)',    '12.5px', 'ratio units basic conversion');
peq('vr(1.33)',     '26.5px', 'int units round to nearest half pixel');
peq('vr(113px)',    '120px',  'pixel units round up to next unit');
peq('vr(113.12px)', '120px',  'pixel units round up to next unit (float)');
peq('vr(155%)',     '155%',   'perc units pass through');
peq('vr(52em)',     '52em',   'em units pass through');


test('custom rhythm global vars', function (t) {
    t.plan(1);

    var str = [
        'blink',
        '  vert: vr(1)',
        '  horz: hr(2)',
    ].join('\n');

    stylus(str)
        .use(vrhr())
        .define('$vertical-rhythm',  new stylus.nodes.Unit(33, 'px'))
        .define('$horizontal-rhythm', new stylus.nodes.Unit(128, 'px'))
        .render(function (err, css) {
            if (err) throw err;
            t.equal(css, 'blink {\n  vert: 33px;\n  horz: 256px;\n}\n');
        });
});

function renderProp(propStr, cb) {
    var str = 'tag { prop: ' + propStr +' }'
    stylus(str)
        .use(vrhr())
        .render(function (err, css) {
            if (err) throw err;
            var found = css.match(/prop:\s([^;]+);/);
            cb(found[1]);
        });
}

function peq(inp, out, des) {
    test(des, function(t) {
        t.plan(1);
        renderProp(inp, function (res) {
            t.equal(res, out);
        });
    });
}



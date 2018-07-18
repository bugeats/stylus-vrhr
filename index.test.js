const test = require('tape');
const plugin = require('./index');
const stylus = require('stylus');

test('basic usage', function (assert) {
    const input = `
        $horizontal-rhythm = 44px

        blink {
          font-size: vr(10/12)
          margin: vr(13.123px) hr(18/12)
        }
    `;

    const expected = [
        'blink {',
        '  font-size: 16.5px;',
        '  margin: 20px 66px;',
        '}',
        ''
    ].join('\n');

    const result = stylus(input)
        .use(plugin())
        .render();

    assert.equal(result, expected);
    assert.end();
});

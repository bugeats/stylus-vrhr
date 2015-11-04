var stylus = require('stylus')
var Unit = stylus.nodes.Unit;

function plugin() {
    return function(renderer) {
        renderer.define('$vertical-rhythm',  new Unit(20, 'px'));
        renderer.define('$horizontal-rhythm', new Unit(80, 'px'));
        renderer.define('vr', gen(renderer, '$vertical-rhythm'));
        renderer.define('hr', gen(renderer, '$horizontal-rhythm'));
    }
}

// generate a function that slices
// based on the specified global variable
function gen(renderer, globalName) {
    return function(number) {
        stylus.utils.assertType(number, 'unit');
        var base = renderer.options.globals[globalName];
        switch (number.type) {
            // undefined is any int or float
            case undefined:
                return new renderer.nodes.Unit(
                    roundToNearestHalf(number.val * base.val)
                , 'px');
                break;
            case 'px':
                return new renderer.nodes.Unit(
                    roundToNextUnit(number.val, base.val)
                , 'px');
                break;
            default:
                return number;
        }
    }
}

function roundToNearestHalf(n) {
    return Math.round(n * 2) / 2;
}

function roundToNextUnit(n, unit) {
    return Math.ceil(n / unit) * unit;
}

module.exports = plugin;

function plugin (opts) {
    const implicit = (opts && opts.implicit === false) ? false : true;

    return function (style) {
        style.include(__dirname);

        if (implicit) {
            style.import('vrhr');
        }
    };
}

module.exports = plugin;

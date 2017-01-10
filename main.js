'use strict';

const utils = require("./utils");
const baseEmail = '@yahoo.co.jp';
const baseTokyoCall = '03';

module.exports.age = (min, max) => {
    if(undefined === min) throw new Error("Range of age is not set");
    if(undefined === max) throw new Error("Range of age is not set");

    return Promise.resolve(utils.rand(min, max));
};

module.exports.email = () => {
    let email = utils.randStr(16) +
                baseEmail;
    return Promise.resolve(email);
};

module.exports.randPwd = () => {
    //it does not equal with string leth of unicode(utf-8) it is size of bytes
    return Promise.resolve(utils.randStr(10));
};

module.exports.call = () => {
    let rndCall = baseTokyoCall +
                  utils.rand(1000, 9999).toString() +
                  utils.rand(1000, 9999).toString();
    return Promise.resolve(rndCall);
};

/**
 * @param {kuroshiro} converter - kana converter (kanji to kana)
 * @return {Array} array of names
 */
module.exports.name = (converter) => {
    return Promise.resolve(converter).then((conv) => {
        let name = utils.namegen();
        let fname = name[0];//family name
        let gname = name[1];//given name
        let fnameKana = conv.toKatakana(fname);
        let gnameKana = conv.toKatakana(gname);

        return [fname, gname, fnameKana, gnameKana];
    });
};

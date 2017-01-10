/* global -Promise */
'use strict';

const main = require("./main");
const kuroshiro = require("kuroshiro");
const Promise = require("bluebird");

Promise.resolve(kuroshiro).then((kuroshiro) => {
    /**
     * TODO: should be wrapping this kuroshiro routine to other function
     *       export this kuroshiro initial routine to other file
     */
    return new Promise((fulfill, reject) => {
        return kuroshiro.init((err) => {
            if(err) 
                return reject(err);
            else
                return fulfill(main.name(kuroshiro));//cause of callback
        });
    }); // get names from kuroshiro module
}).then((names) => {
    return main.age(1980, 1995).then((age) => {
        names.push(age);
        return names;
    }); // append age
}).then((infos) => {
    return main.email().then((email) => {
        infos.push(email);
        return infos;
    }); // append email
}).then((infos) => {
    return main.call().then((number) => {
        infos.push(number);
        return infos;
    }); // append call number
}).then((res) => {
    //console.log output, you can export to db or other storage, if you want
    console.log(res);
}).catch((err) => {
    console.log(err);
});

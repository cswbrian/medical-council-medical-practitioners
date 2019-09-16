const rp = require('request-promise');
const $ = require('cheerio');
const parseSingle = require('./parse-single');
const url = 'https://www.mchk.org.hk/tc_chi/list_register/list.php?page=1&ipp=20&type=L'

rp(url)
    .then(function (html) {

        const mchkUrls = [];
        for (let i = 1; i < 5; i++) {
            mchkUrls.push(`https://www.mchk.org.hk/tc_chi/list_register/list.php?page=${i}&ipp=20&type=L`);
        }
        return Promise.all(
            mchkUrls.map(url => {
                return parseSingle(url)
            })
        );
    })
    .then(function (practitioners) {
        console.log(practitioners);
    })
    .catch(function (err) {
        //handle error
    })


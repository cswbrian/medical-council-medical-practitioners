const rp = require('request-promise');
const $ = require('cheerio');

const parseSingle = url => {
    return rp(url)
        .then(function (html) {
            //success!
            const table = $('#Table_5 > tbody > tr > td > table > tbody > tr > td > table > tbody', html)
            const practitioners = []
            const keys = ['reg', 'name', 'address', 'qualification', 'year']
            const row = $('tr', table)
            for (let i = 0; i < row.length; i++) {
                const td = $('td > span', row[i])
                const practitioner = {}
                for (let j = 0; j < td.length; j++) {
                    td[j].children.forEach(c => {
                        if (c.name === 'a') {
                            c.children.forEach(cc => {
                                if (cc.data) {
                                    practitioner[keys[j]] = (practitioner[keys[j]] || '').concat(', ', cc.data)
                                }
                            })
                        } else {
                            if (c.data) {
                                practitioner[keys[j]] = (practitioner[keys[j]] || '').concat(', ', c.data)
                            }
                        }
                    })
                }
                practitioners.push(practitioner)
            }
            return practitioners
        })
        .catch(function (err) {
            //handle error
        })
}

module.exports = parseSingle
const phantom = require('phantom');
const log     = require('./log');
const config  = require('./config');

const login = config.get('site:login');
const pass  = config.get('site:pass');
const url   = config.get('site:url');
let _ph, _page;

/**
 * Парсинг сайта
 *
 * @returns {Promise<any | never>}
 */
function parser() {
    return phantom.create()
        .then(ph => {
            _ph = ph;
            return _ph.createPage();
        })
        .then(page => {
            _page = page;
            log.set('open link: ', url);
            return _page.open(url);
        })
        .then(status => {
            log.set('open page login: ', status);

            if (status === 'success') {
                return _page.invokeMethod('evaluate', function (login, pass) {
                    $('#inp-contract').val(login);
                    $('#inp-pass').val(pass);
                    $('#btn-enter-pc').click();
                }, login, pass);
            }
            throw ('error open page login');
        })
        .then(() => {
            return new Promise(function (resolve, reject) {
                log.set('timeout authorization: ', 'start 5 sec');
                setTimeout(function () {
                    log.set('timeout authorization: ', 'stop');
                    resolve();
                }, 5000);
            });

        })
        .then(() =>{
            return _page.invokeMethod('evaluate', function () {
                return $('.bill_balance:first').text();
            });

        })
        .then((html) => {
            log.set('open page info: ', html);
            _ph.exit();
            return html;
        })
        .catch(error => {
            log.set('error: ', error);
            _ph.exit();
            throw ('error phantom');
        });
}

module.exports = {
    parser
};
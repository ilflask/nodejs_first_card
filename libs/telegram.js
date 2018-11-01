const request = require('request');
const log     = require('./log');
const config  = require('./config');

/**
 * Отправка сообщение в телеграмм
 *
 * @param mess
 * @returns {Promise<any[]>}
 */
function sendMessage (mess) {
        const listPromise = [];

        const utl = config.get('telegram:url');
        const token = config.get('telegram:token');
        const chat_id = config.get('telegram:chat_id');

        chat_id.forEach((v, k) => {
            listPromise[k] = new Promise((resolve, reject) => {
                    request({
                        method: 'GET',
                        url: `${utl}/bot${token}/sendMessage`,
                        qs: {
                            chat_id: v,
                            text: mess
                        }
                    }, function (error, response, body) {
                        log.set('result telegram: ', '' + response.statusCode);
                        if (response.statusCode === 200) {
                            resolve(body);
                        } else {
                            log.set('error telegram: ', error + ' ' + response.statusCode);
                            reject(response.statusCode);
                        }
                    });
            });
        });

        return Promise.all(listPromise);
}

module.exports = {
    sendMessage
};
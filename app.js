const telegram = require('./libs/telegram');
const phantom = require('./libs/phantom');


phantom
    .parser()
    .then((html) => {
       return telegram.sendMessage(html);
});

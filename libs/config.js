const nconf = require('nconf');
const nconfYaml = require('nconf-yaml');
const path = require('path');

nconf.env()
.file({
    file: path.join(__dirname, '../config/config.yml'),
    format: nconfYaml
})
.argv({
    h: {
        alias: 'host',
        describe: 'Instance host',
        default: '127.0.0.1',
        type: 'string'
    }
});
nconf.defaults({
    NODE_ENV: 'production',
    db: {
        poolSize: 10
    }
});

module.exports = nconf;

const welcome = require('../components/welcome/network');
const numberOrdes = require('../components/operations/network');
const storeView = require('../components/store/network');
const loginAndRegister = require('../components/loginAndRegister/network');
const versionApi ="v1";

const routes = (server) => {
    server.use('/welcome', welcome);
    server.use('/store', storeView);
    server.use('/login', loginAndRegister);
    server.use(`/api/${versionApi}`, numberOrdes);
}
module.exports = routes;
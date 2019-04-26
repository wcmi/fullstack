const routes =module.exports = require('next-routes')();

routes
.add('/compaigns/new','/compaigns/new')
.add('/compaigns/:address','/compaigns/show')
.add('/compaigns/:address/request','/compaigns/request/index')
.add('/compaigns/:address/request/new','/compaigns/request/new')

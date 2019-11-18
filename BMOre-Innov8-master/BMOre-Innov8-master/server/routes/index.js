const express = require("express");
const apiRouter = express.Router();
const transactionJson = require('../../Assets/transactions1.json');

require('./apiRoutes')(apiRouter);

module.exports = function (app) {
    app.use(express.static('public'));
    app.use('/api', apiRouter);
}

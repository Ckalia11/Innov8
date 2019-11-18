const axios = require("axios").default;
const calcService = require('../services/index');

const baseUrl = 'https://bmoinnov8.ca'
const username = 'alec'
const password = 'password'

const basicAuth = 'Basic ' + Buffer.from(username + ':' + password).toString('base64');

axios.defaults.headers.get['Content-Type'] = 'application/json';
axios.defaults.headers.get['x-api-key'] = 'n8ihgYz7UjaNBaLW1H85o8nVtgHbxF2d3yfjnn1l';
axios.defaults.headers.get['Authorization'] = basicAuth;

module.exports = (router) => {
    router.get("/getAccounts", (req, res) => {
        axios.get(`${baseUrl}/accounts`).then(response => {
            res.send('Success');
        }).catch(err => {
            console.log(err)
            console.log("Failed to fetch /accounts");
            res.send('Error')
        })
    })

    router.get('/getScore/:id', (req, res) => {
        axios.get(`${baseUrl}/accounts/${req.params.id}/transactions`).then(response => {
            transactions = response.data.Data.Transaction;
            score = calcService.calcScore(transactions);
            res.send(score.toString());
        }).catch(err => {
            console.log(err)
            console.log("Failed at /getScore");
            res.send('Error')
        })
    })

    router.get('/getTransactionsCategory/:id', (req, res) => {
        axios.get(`${baseUrl}/accounts/${req.params.id}/transactions`).then(response => {
            transactions = response.data.Data.Transaction;
            let CatPercent = calcService.calcCatPercent(transactions);
            res.send(CatPercent);
        }).catch(err => {
            console.log(err)
            console.log("Failed at /getTransactions");
            res.send('Error')
        })
    })
}
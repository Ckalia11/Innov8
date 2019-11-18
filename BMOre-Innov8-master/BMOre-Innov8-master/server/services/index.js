const categoriesAsset = require('../../Assets/categories');
const categoriesMap = categoriesAsset.categoriesMap;
const categoriesWeightPercent = categoriesAsset.categoriesWeightPercent;

exports.calcScore = (transactions) => {
    let score = 0;

    let trans_cat = {};
    let totalTransAmt = 0;
    
    transactions.forEach(trans => {
        const merchInfo = trans.SupplementaryData.merchantInfo
        const catCode = merchInfo.catCode;
        const curCategory = categoriesMap[catCode];
        const transAmt = trans.Amount.Amount;

        if (!trans_cat[curCategory]){
            trans_cat[curCategory] = 0;
        }
        trans_cat[curCategory] += +transAmt;
        totalTransAmt += +transAmt;
    })

    Object.keys(trans_cat).forEach(category => {
        if (isNaN(categoriesWeightPercent[category])){
            return;
        }
        score += (categoriesWeightPercent[category]) - (trans_cat[category]/totalTransAmt*100)
    })
    return Math.max(0, Math.min(score, 100))/100;
}


exports.calcCatPercent = (transactions) => {
    let trans_cat = {};

    transactions.forEach(trans => {
        const merchInfo = trans.SupplementaryData.merchantInfo
        const catCode = merchInfo.catCode;
        const curCategory = categoriesMap[catCode];
        const transAmt = trans.Amount.Amount;

        if (!trans_cat[curCategory]){
            trans_cat[curCategory] = 0;
        }
        trans_cat[curCategory] += +transAmt;
    })
    
    return trans_cat;
}

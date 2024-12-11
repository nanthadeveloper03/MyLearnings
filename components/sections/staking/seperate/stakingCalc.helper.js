let currentMarket = 3
let comitmentamt = false

export const currentUSDTValueCalc = (price, amount) => {
    try {
        
        price = parseFloat(price)
        amount = parseFloat(amount)
        if (price > 0 && amount > 0) {
            return amount * price;
        }
        return 0
    } catch (err) {
        return 0
    }
};

export const initialUSDTValueCalc = (value, amount) => { 
    try {
        amount = parseFloat(amount)
        value = parseFloat(value)

        if (amount > 0 && value > 0) {
            return value * amount;
        }
        return 0
    } catch (err) {
        return 0
    }
};

export const fullfilledCommites = (lastPrice, entryPrice, amount) => {
    try {
        
        lastPrice = parseFloat(lastPrice);
        amount = parseFloat(amount);
        entryPrice = parseFloat(entryPrice);
        let commitments = 0;
        if (lastPrice > 0 && entryPrice > 0) {
            // return ((lastPrice - amount) / amount) * 100
            // return (lastPrice - amount) * entryPrice
            // commitments = (100 - (amount * lastPrice));

            // commitments = ((lastPrice - amount) * 100) - 100;

            if(!comitmentamt){
                commitments = 100
            }else{
                // commitments = ((lastPrice - entryPrice) / entryPrice ) * 100
                commitments = ((lastPrice * 100) / entryPrice) - 100
     
            }
            // if(commitments < 0) return commitments = 0;
            return commitments;
        }
    } catch (err) {
        return 0
    } 
}

// export const commitmentsGraph = (lastPrice, entryPrice, amount) => {
//     try {
//         lastPrice = parseFloat(lastPrice);
//         amount = parseFloat(amount);
//         entryPrice = parseFloat(entryPrice);
//         let commitments = 0;
//         if (lastPrice > 0 && entryPrice > 0) {
//             commitments = ((lastPrice - entryPrice) / entryPrice ) * 100
//         }
        
//         if(commitments < 0) return 100 + commitments
//         else if (commitments > 0) return 100 - commitments
//         else return 100 - commitments;
//         // return 0;
//     } catch (err) {
//         return 0
//     } 
// }

export const commitmentsGraph = (lastPrice, entryPrice, amount) => {
    try {
        lastPrice = parseFloat(lastPrice);
        amount = parseFloat(amount);
        entryPrice = parseFloat(entryPrice);
        let commitments = 0;
        if (lastPrice > 0 && entryPrice > 0) {
            commitments = ((lastPrice - entryPrice) / entryPrice ) * 100
        }

        if(commitments < 0) return Math.abs(commitments)
        else if (commitments > 0) return 100 - commitments
        else return 100 - commitments;
        // return 0;
    } catch (err) {
        return 0
    } 
}
export const uproGrowthPercentage = (lastPrice, amount) => {
    try {
        lastPrice = parseFloat(lastPrice);
        amount = parseFloat(amount);
        if (lastPrice > 0 && amount > 0) {
            // return ((lastPrice - amount) / amount) * 100
            return (lastPrice - amount)
        }
    } catch (err) {
        return 0
    } 
}

export const ourCommitments = (price, amount, value) => {
    try {
        
        price = parseFloat(price)
        amount = parseFloat(amount)
            // return (amount / price);
            // return 100 - (amount * price)
            // let b = value + value

            // let b = value * 2
            let b = amount * 2  
            let c = b / price
            let valueamtt = c - value

            if(valueamtt > 0 || valueamtt == 0) {
                comitmentamt = true
            }else{
                comitmentamt = false
            }
            return valueamtt > 0 ? valueamtt : 0
    } catch (err) {
        return err
    } 
}

export const pnl = (lastPrice, amount, entryPrice) => {
    try {
        
        lastPrice = parseFloat(lastPrice);
        amount = parseFloat(amount);
        entryPrice = parseFloat(entryPrice);
        if (lastPrice > 0 && entryPrice > 0) {

            // return (lastPrice - entryPrice) * 100
            // let pnl =  ((lastPrice - entryPrice) / entryPrice) * 100;
            // let diff = lastPrice - entryPrice;
            // let original = (diff/lastPrice);
            // let val = original * 100

            // let dataVal = (lastPrice - entryPrice) / entryPrice
            // return dataVal * 100

            let dataVal = (lastPrice * 100) / entryPrice
            return dataVal - 100

        }
        return 0;
        
    } catch (err) {
        return 0
    } 
}



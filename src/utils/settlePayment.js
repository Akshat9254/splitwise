import Heap from './heap'

const settlePayment = (transactions) => {
    // transactions -> [{payer, payee, amount}]

    let users = {} // users -> { user: amount }
    transactions.forEach(expense => {
        const {payer, payee, amount} = expense

        if(payer in users) users[payer] += Number(amount)
        else users[payer] = Number(amount)

        if(payee in users) users[payee] -= Number(amount)
        else users[payee] = -Number(amount)
    })

    console.log({users});


    const positive = new Heap()
    const negative = new Heap()

    for(let user in users) {
        if(users[user] > 0) positive.add({ user, amount: users[user] })
        else if(users[user] < 0) negative.add({ user, amount: -users[user] })
    }

    let minimizedTransactions = []

    while(!positive.isEmpty()) {
        const newPayee = positive.remove()
        const newPayer = negative.remove()

        const expense = {payer: newPayer.user, payee: newPayee.user, amount: Math.min(newPayer.amount, newPayee.amount)}
        minimizedTransactions.push(expense)

        if(newPayee.amount > newPayer.amount) positive.add({ user: newPayee.user, amount: newPayee.amount - newPayer.amount })
        else if(newPayee.amount < newPayer.amount) negative.add({ user: newPayer.user, amount: newPayer.amount - newPayee.amount })
        
    }

    return minimizedTransactions
}

// const result = settlePayment([
//     {
//         payer: 'A',
//         payee: 'B',
//         amount: 100
//     },
//     {
//         payer: 'B',
//         payee: 'C',
//         amount: 20
//     },
//     {
//         payer: 'A',
//         payee: 'C',
//         amount: 50
//     },
//     {
//         payer: 'B',
//         payee: 'A',
//         amount: 80
//     }
// ])

// result.forEach(res => console.log(res))


export default settlePayment
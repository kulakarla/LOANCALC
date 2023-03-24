const express = require('express')
const app = express();
const cors = require('cors')
require('jsonwebtoken');
const port = process.env.PORT || 3000;

app.use(cors({origin: 'http://localhost:8080'}));

app.listen(port, () => {
    console.log("Listening on port: " + port)
})

app.use(express.json());


app.get("/api/loans/:personalcode/:loanamount/:loanduration", async (req, res) => {
    const personalcode = req.params.personalcode;
    const loanamount = req.params.loanamount;
    const loanduration = req.params.loanduration;

    res.setHeader("Content-Type", "application/json");



    let creditModifier = parsePersonalCode(personalcode);

    let loanAmountPossible = getAmount(creditModifier, loanamount, loanduration);

    const responseData = {
        "getsLoan": true,
        "loanInitialPeriod": true,
        "initialPeriod": loanduration,
        "loanAmount": loanAmountPossible,
        "minimumLoanHypotheticalPeriod": null,
        "possibleInitialLoanPeriod": null

    }

    if(creditModifier !== -1) {
        if (loanAmountPossible === -1) {
            const newMinimumLoanDesiredLoanPeriod = firstLoanDesiredLoan(creditModifier, loanamount);
            if (newMinimumLoanDesiredLoanPeriod[0] !== -1) {

                responseData.loanInitialPeriod = false;
                responseData.initialPeriod = loanduration;
                responseData.minimumLoanHypotheticalPeriod = newMinimumLoanDesiredLoanPeriod[0];
                responseData.loanAmount = loanamount;
                responseData.possibleInitialLoanPeriod = newMinimumLoanDesiredLoanPeriod[1];


            } else {

                responseData.getsLoan = false;
                responseData.loanInitialPeriod = false;

            }
        }
    }else{
        responseData.getsLoan = false;
        responseData.initialPeriod = false;
    }

    JSON.stringify(responseData);
    res.send(responseData);
});


function parsePersonalCode(personalCode) {
    let creditModifier = personalCode.slice(-2);
    switch (creditModifier) {
        case '65':
            creditModifier = -1;
            break;
        case '76':
            creditModifier = 100;
            break;
        case '87':
            creditModifier = 300;
            break;
        case '98':
            creditModifier = 1000;
            break;
    }

    return creditModifier;

}

function getAmount(creditModifier, loanAmount, loanPeriod) {
    let creditScore = (creditModifier / loanAmount) * loanPeriod;
    let loanDenied = -1

    if (creditScore > 1) {
        return creditModifier * loanPeriod <= 10000 ? creditModifier * loanPeriod : 10000;
    } else if (creditScore < 1) {
        return creditModifier * loanPeriod >= 2000 ? creditModifier * loanPeriod : -1;
    } else if (creditScore === 1) {
        return loanAmount;
    }

    return loanDenied;

}

function firstLoanDesiredLoan(creditModifier, loanAmount) {
    let newLoanPeriod = Math.ceil(2000 / creditModifier);
    //let newMinimumPeriodLoan = -1;
    let newPossibleInitialLoanPeriod = Math.ceil(loanAmount / creditModifier);

    if (newLoanPeriod >= 12 && newLoanPeriod <= 60) {
        if (newPossibleInitialLoanPeriod > 60) {
            newPossibleInitialLoanPeriod = -1;
        }
    }
    return [newLoanPeriod, newPossibleInitialLoanPeriod]

}

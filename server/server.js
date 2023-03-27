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


/**
 * main GET method of the API, which makes the loan decision(s) according the 3 input parameters
 * @param personalcode personal code entered in the main GUI application, already validated
 * @param loanamount already validated loan amount
 * @param loanduration already validated loan payment period
 */
app.get("/api/loans/:personalcode/:loanamount/:loanduration", async (req, res) => {
    const personalcode = req.params.personalcode;
    const loanamount = req.params.loanamount;
    const loanduration = req.params.loanduration;

    res.setHeader("Content-Type", "application/json");


    //parsing the personal code for the credit modifier
    let creditModifier = parsePersonalCode(personalcode);


    //calculating the loan amount according to the inout period
    let loanAmountPossible = getAmount(creditModifier, loanamount, loanduration);


    //intializing a JSON response
    const responseData = {
        "getsLoan": true,
        "loanInitialPeriod": true,
        "initialPeriod": loanduration,
        "loanAmount": loanAmountPossible,
        "minimumLoanHypotheticalPeriod": null,
        "possibleInitialLoanPeriod": null

    }


    //if creditModifier is valid (the user is not in debt),
    //check if a loan for the payment period initially desired by the user is possible
    //if not, find a new possible loan period for the minimum amount (2000€) and the desired amount
    //change the JSON accordingly
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


    //Ending the request by sending the JSON data back.
    JSON.stringify(responseData);
    res.send(responseData);
});

/**
 * Simple function for getting a credit modifier out of the personal code
 * @param personalCode input personal code
 * @returns {number} the right credit modifier
 */
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

/**
 * A method which calculates the loan possible for the payment period initialized by the user
 * @param creditModifier the credit modifier of the debtor
 * @param loanAmount the initial loan amount desired
 * @param loanPeriod the initial payment period desired
 * @returns the maximum amount possible for the debtor in their desired period, -1 if a loan in the initialized period is not possible
 */
function getAmount(creditModifier, loanAmount, loanPeriod) {
    let creditScore = (creditModifier / loanAmount) * loanPeriod;
    let loanDenied = -1


    //if creditscore is bigger than 1 or smaller than 1, calculate the new loan amount in the specified period
    if (creditScore > 1) {
        return creditModifier * loanPeriod <= 10000 ? creditModifier * loanPeriod : 10000;
    } else if (creditScore < 1) {
        return creditModifier * loanPeriod >= 2000 ? creditModifier * loanPeriod : -1;
    } else if (creditScore === 1) {
        return loanAmount;
    }

    return loanDenied;

}

/**
 * Calculates the periods which the debtor can take out a loan of the minimum amount (2000€) and the desired loanAmount amount.
 * @param creditModifier the credit modifier of the debtor
 * @param loanAmount the initial loan amount desired
 * @returns {number[]} array with the possible period for the minimum loan amount and desired loan amount
 */
function firstLoanDesiredLoan(creditModifier, loanAmount) {
    //calculate the new periods, use the math.ceil to get the appropriate period in full months only
    let newLoanPeriod = Math.ceil(2000 / creditModifier);
    let newPossibleInitialLoanPeriod = Math.ceil(loanAmount / creditModifier);

    //if the minimum loan can be granted, check if the desired loan period is between 12 and 60 months, if not, set it to -1
    if (newLoanPeriod >= 12 && newLoanPeriod <= 60) {
        if (newPossibleInitialLoanPeriod > 60) {
            newPossibleInitialLoanPeriod = -1;
        }
    }

    return [newLoanPeriod, newPossibleInitialLoanPeriod]

}

import inquirer from 'inquirer';
import chalk from 'chalk';
import fs from 'fs';

import {operation} from '../index.mjs'
import checkAccount from './checkAccount.mjs';

function CheckBalance() {
    inquirer.prompt([
        {
            name: 'accountName',
            message: 'What is your account name?'
        }
    ]).then((answer) => {
        const accountName = answer['accountName'];


        if (!checkAccount(accountName)) {
            return operation()
        }

        fs.readFile(`accounts/${accountName}.json`, 'utf8', (err, data) => {
            const currentData = JSON.parse(data);
            const currentBalance = currentData.balance;

            console.log(chalk.bgGreen(`Your current balance is: ${currentBalance}$`))
            operation();
        },
    )
}).catch((err) => console.error('Error reading file:', err))
    
}

export default CheckBalance;
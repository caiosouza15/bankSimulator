import inquirer from 'inquirer';
import chalk from 'chalk';
import fs from 'fs';
import checkAccount from './checkAccount.mjs';
import { operation } from '../index.mjs';

function withdraw() {

    inquirer.prompt([
        {
            name: 'accountName',
            message: 'What is your account name?'
        }
    ]).then((answer) => {
        const accountName = answer['accountName'];

        if (!checkAccount(accountName)) {
            return withdraw()
        }

        // Lendo o arquivo JSON
        fs.readFile(`accounts/${accountName}.json`, 'utf8', (err, data) => {
            if (err) {
                console.error('Error reading file:', err);
                return;
            }

            const accounts = JSON.parse(data);
            let currentBalance = accounts.balance;

            if (currentBalance === 0) {
                console.log(chalk.bgRed.black("The current value of your account is 0$, please deposit some money "))
                return operation();
            }
            
            console.log(chalk.bgBlue.black(`Your current balance is: ${currentBalance}$`));

            inquirer.prompt([
                {
                    name: 'withdraw',
                    message: 'How much do you want to withdraw?'
                }
            ]).then((answer) => {
                const depositAmount = parseFloat(answer['withdraw']);

                if (depositAmount > currentBalance) {
                    console.log(chalk.bgRed.black("The amount you want to withdraw is greater than your current balance"))
                    return withdraw()
                }
                

                // Retirando o valor do depósito ao saldo atual da conta
                let newBalance = JSON.parse(currentBalance -= depositAmount);

                // Escrevendo de volta no arquivo JSON   
                fs.writeFile(`accounts/${accountName}.json`, `{"balance": ${newBalance}}`, (err) => {
                    if (err) {
                        console.error('Error writing file:', err);
                        return;
                    }
                    console.log(chalk.bgGreen('Withdraw successful!'));
                    console.log(chalk.bgGreen(`Its updated value is: ${newBalance}`));
                    operation()
                });
            }).catch((err) => console.error('Error:', err));
        });
       
    }).catch((err) => console.error('Error:', err));
}
export default withdraw;
import inquirer from 'inquirer';
import chalk from 'chalk';
import fs from 'fs';

import {operation} from '../index.mjs'
import checkAccount from './checkAccount.mjs';


export function deposit() {

    inquirer.prompt([
        {
            name: 'accountName',
            message: 'What is your account name?'
        }
    ]).then((answer) => {
        const accountName = answer['accountName'];
        const accountPath = 'accounts';

        if (!checkAccount(accountName)) {
            return deposit()
        }

        // Lendo o arquivo JSON
        fs.readFile(`${accountPath}/${accountName}.json`, 'utf8', (err, data) => {
            if (err) {
                console.error('Error reading file:', err);
                return;
            }

            const accounts = JSON.parse(data);
            let currentBalance = accounts.balance;

            inquirer.prompt([
                {
                    name: 'balance',
                    message: 'How much do you want to deposit?'
                }
            ]).then((answer) => {
                const depositAmount = parseFloat(answer['balance']);

                // Adicionando o valor do depósito ao saldo atual da conta
                let newBalance = JSON.parse(currentBalance += depositAmount);

                // Escrevendo de volta no arquivo JSON   
                fs.writeFile(`${accountPath}/${accountName}.json`, `{"balance": ${newBalance}}`, (err) => {
                    if (err) {
                        console.error('Error writing file:', err);
                        return;
                    }
                    console.log(chalk.bgGreen('Deposit successful!'));
                    console.log(chalk.bgGreen(`Its updated value is: ${newBalance}`));
                    operation();
                });
            }).catch((err) => console.error('Error:', err));
        });
    }).catch((err) => console.error('Error:', err));
}
export default deposit;
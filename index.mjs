import inquirer from 'inquirer';
import chalk from 'chalk';
import fs from 'fs';

import buildAccount  from './operations/buildAccount.mjs';
import deposit from './operations/depoist.mjs';
import CheckBalance from './operations/checkBalance.mjs';
import withdraw from './operations/witdraw.mjs';

operation();
export function operation() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'Whats do you want to do?',
            choices: ['Create account', 'Check balance', 'Deposit', 'Withdraw', 'exit']
        }
    ]).then((answer) => {
        const action = answer['action'];

        switch (action) {
            case 'Create account':
                createAccount();
                break;
            case 'Check balance':
                CheckBalance();
                break;
            case 'Deposit':
                deposit();
                break;
            case 'Withdraw':
                withdraw();
                break;
            case 'exit':
                console.log(chalk.bgBlue.black("Bye!"));
                process.exit(0);
                break;
            default:
                console.log("Unrecognized action");
        }

    }).catch((err) => console.error(err));
}

function createAccount() {
    console.log(chalk.bgGreen.black("Congratulations for you decide to create a new account"));
    console.log(chalk.green("set your account options below"));
    buildAccount()
}
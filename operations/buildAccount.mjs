import inquirer from 'inquirer';
import chalk from 'chalk';
import fs from 'fs';

import {operation} from '../index.mjs'

function buildAccount() {
    inquirer.prompt([
        {
            name: 'accountName',
            message: 'What is your account name?'
        }
    ]).then((answer) => {
        const accountName = answer['accountName'];        

        const accountPath = 'accounts'; // Caminho relativo para a pasta de contas
        
        if (!fs.existsSync(accountPath)) {
            fs.mkdirSync(accountPath);
        }

        if (fs.existsSync(`${accountPath}/${accountName}.json`)) {
            console.log(
                chalk.bgRed.black("The Account already exists, choose another name")
            );
            return buildAccount();
        }

        fs.writeFileSync(`${accountPath}/${accountName}.json`,
            '{"balance": 0}',
            (err) => {
                if (err) {
                    console.log(err);
                }
            });

        console.log(chalk.bgGreen('Congratulations, your account has been created'));
        operation();
    }).catch((err) => console.log(err));
}
export default buildAccount;
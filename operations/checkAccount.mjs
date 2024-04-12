import chalk from 'chalk';
import fs from 'fs';

function checkAccount(accountName) {
    if (!fs.existsSync(`accounts/${accountName}.json`)) {
        console.log(
            chalk.bgRed.black("The Account does not exist, choose another name")
        )
        return buildAccount();
    }
    return true;
}
export default checkAccount; 
import { writeFile } from 'fs';
// Configure Angular `environment.ts` file path
const targetPath = './src/environments/environment.ts';
const path = require('path')
// Load node modules
const colors = require('colors');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })
// `environment.ts` file structure
const baseURL = process.env.PRODUCTION ? process.env.BASE_URL_HEROKU : process.env.BASE_URL
const envConfigFile = `export const environment = {
   baseUrl: '${baseURL}',
   production: '${process.env.PRODUCTION || false}'
};
`;
console.log(colors.magenta('The file `environment.ts` will be written with the following content: \n'));
console.log(colors.grey(envConfigFile));
writeFile(targetPath, envConfigFile, function (err) {
   if (err) {
       throw console.error(err);
   } else {
       console.log(colors.magenta(`Angular environment.ts file generated correctly at ${targetPath} \n`));
   }
});

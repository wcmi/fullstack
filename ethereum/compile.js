const  path = require('path');
const  solc = require('solc');
const fs = require('fs-extra');
const buildpath = path.resolve(__dirname,'build');


fs.removeSync(buildpath);

const  campainpath = path.resolve(__dirname, 'contracts','complain.sol');
const source = fs.readFileSync(campainpath,'utf8');


//console.log(source);
const output = solc.compile(source, 1).contracts;
//console.log(output);

fs.ensureDirSync(buildpath);

for(let contract in  output){
  fs.outputJsonSync(path.resolve(buildpath,contract.replace(":","")+'.json'),output[contract]);

}

// Run the existing regression suites in Node without installing dependencies.
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
for(const suite of ['tests/simulation.js','tests/render-smoke.js','tests/improvements.js','tests/scenes.js']){
  const context=vm.createContext({console,print:(...args)=>console.log(...args)});
  context.readFile=file=>fs.readFileSync(path.join(root,file),'utf8');
  context.load=file=>vm.runInContext(context.readFile(file),context,{filename:file});
  context.load(suite);
}

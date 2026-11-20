// Optional development check: install linkedom outside the production dist folder.
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {parseHTML} from 'linkedom';
import {checkUI} from '../tests/ui-contract.mjs';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const files=Object.fromEntries(['index.html','app.js','story.js','report.js','core.js','interaction.js','world.js','scene.js'].map(p=>['dist/'+p,fs.readFileSync(path.join(root,'dist',p),'utf8')]));
const results=checkUI(parseHTML,files);
for(const name of results)console.log('PASS '+name);
console.log('RESULT '+results.length+' DOM workflow checks passed. Canvas and speech are mocked.');

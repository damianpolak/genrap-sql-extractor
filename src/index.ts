import fs from 'fs';
import path from 'path';
import { argv } from 'process';
import { promisify } from "util";
import { XMLParser, XMLBuilder, XMLValidator } from "fast-xml-parser";

interface ReplacePattern {
  from: string, 
  to: string
}

interface UfnObject {
  filename: string,
  name?: string,
  query?: string,
  error: string | unknown
}

(async () => {
  argv[2] = '--directory';
  argv[3] = 'src/genrap';
  argv[4] = '--output=json';
  
  const onBadArguments = () => {
    console.log('Wrong cli arguments');
    console.log('Use: --directory <dirPath>');
    console.log('Use: --output=<txt|json>');
    process.exit();
  }
  
  if(argv.length < 3) {
    onBadArguments();
    process.exit()
  } else {
    const firstArg = argv[2] == '--directory' && fs.existsSync(argv[3]);
    const secondArg = argv[4] == '--output=txt' || argv[4] == '--output=json';
    if(!firstArg || !secondArg) onBadArguments();
  }

  const dirname = argv[3];
  // const outputFormat = argv[4].split('=')[1];
  
  const charReplacer = (str: string, charArray: ReplacePattern[]): string => {
    const char = charArray[0];
    const regExp = new RegExp(`${char.from}`, 'g');
  
    if(charArray.length > 1) {
      charArray.shift();
      return charReplacer(str.replace(regExp, char.to), charArray);
    } else {
      return str.replace(regExp, char.to);
    }
  }
  
  const dirFiles = async (dirname: string, extFilter = 'ufn'): Promise<string[]> => {
    try {
      return (await (promisify(fs.readdir)(dirname))).filter(i => i.split('.')[1] == 'ufn');
    } catch(e) {
      console.error('An error occurred while loading the directory files');
      return [];
    }
  }
  
  const ufnProceed = async (filename: string): Promise<UfnObject[]> => {
    try {
      const xmlData = await promisify(fs.readFile)(path.join(dirname, filename));
      const parser = new XMLParser({ignoreAttributes: false});
  
      return (parser.parse(xmlData) as any).GenrapUfn.ufn.UFUserDefEnt.map((item: any) => {
        return { filename: filename, name: item['@_name'], query: item.entKind.userQuery, error: '' };
      });
    } catch(error) {
      return [{ filename: filename, name: '', query: '', error: error }]
    }
  }

  const toReplace: ReplacePattern[] = [
    { from: '&gt;', to: '>' },
    { from: '&lt;', to: '<' },
    { from: '&apos;', to: '\'' },
    { from: '&#10;', to: '\n' },
  ];

  let data: string = '';

  for await(let item of await dirFiles(dirname)) {
    const ufnObject = await ufnProceed(item);
    data += `--- START FILENAME [${ufnObject[0].filename}] ---\r\n`;
    
    ufnObject.forEach(ufnItem => {
      if(ufnItem.error != '') {
        data += `--- ERROR: ${ufnItem.error}\r\n`;
      } else {
        data += `------ QUERYNAME: ${ufnItem.name}\r\n`;
        data += `------ QUERY: \r\n ${charReplacer(ufnItem.query as string, toReplace)}\r\n`;
      }
    })

    data += `--- END FILENAME [${ufnObject[0].filename}] ---\r\n`;
    data += `\r\n`;
    data += `\r\n`;
    data += `\r\n`;
  }

  fs.writeFile(path.join(dirname, 'output.sql'), data,(err) => {
    if(err) {
      console.log(err);
    } else {
      console.log('ok');
    }
  })
})();

import fs from 'fs';
import path, { dirname } from 'path';
import { argv } from 'process';
import { promisify } from 'util';
import { XMLParser, XMLBuilder, XMLValidator } from 'fast-xml-parser';
import { XMLGrs } from './types';
import { GrsExtractor, UfnExtractor } from './extractor';

// console.log(`=== DirName: `, __dirname);

// const ufnProceed = async (filename: string): Promise<any> => {
//   try {
//     const xmlData = await promisify(fs.readFile)(
//       path.join(__dirname, filename)
//     );
//     const parser = new XMLParser({ ignoreAttributes: false });
//     return (parser.parse(xmlData) as XMLGrs.Data).GenrapGrs.oddlSchema.mapping.sql.entities.elem[0]['@_sqlTableQuery'];
//     // return (parser.parse(xmlData) as XMLGrs).GenrapGrs.oddlSchema;
//     // return (parser.parse(xmlData) as any).GenrapUfn.ufn.UFUserDefEnt.map((item: any) => {
//     //   return { filename: filename, name: item['@_name'], query: item.entKind.userQuery, error: '' };
//     // });
//   } catch (error) {
//     return [{ filename: filename, name: '', query: '', error: error }];
//   }
// };

// (async () => {
//   let result = await ufnProceed('\\grs\\zlecenia.grs');
//   console.log(result);
// })();


let files: string[] = ['file1.grs', 'file2.grs', 'file3.grs'];
files.forEach(async (file) => {
  const grsExtractor = new GrsExtractor();
  let result = grsExtractor.getDataFromXML();

  console.log(  await grsExtractor.export());
})




// const ufnExtractor = new UfnExtractor();
// let data = ufnExtractor.getDataFromXML();
// console.log(data);
// ufnExtractor.saveYaml().then((result) => {
//   console.log(result);
// });
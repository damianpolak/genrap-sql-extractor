/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { promisify } from 'util';
import { GrsExtractor, UfnExtractor } from './extractor';
import { GenericObjectOrArray, XMLParser } from 'fast-xml-parser';
import fs from 'fs';
import { XMLUfn } from './types/ufn.type';
import { argsParse } from './cli';

// argsParse();

(async () => {
  // const grsExtractor = new GrsExtractor();
  // const filepath = __dirname + `\\genrap\\TOK_PMIR_RAPORT_PPRZYL200_SI2.grs`;
  // const extractHook = await grsExtractor.runExtractProcess(filepath);
  // extractHook.exportToFile('C:\\Users\\dapolak\\OneDrive - Tauron\\Pulpit', 'yml');
  // console.log(extractHook?.getExtractedData());

  // const ufnExtractor = new UfnExtractor();
  // const filepath = __dirname + `\\genrap\\TOK_PMIR_RAPORT_PPRZYL200_SI2.ufn`;
  // const extractHook = await ufnExtractor.runExtractProcess(filepath);
  // extractHook.exportToFile('C:\\Users\\dapolak\\OneDrive - Tauron\\Pulpit', 'yml');
  // console.log(extractHook?.getExtractedData());

  // grsExtractor.export('output.txt', JSON.stringify(result));
})();

(async () => {
  //
  // const xmlData = await promisify(fs.readFile)(__dirname + `\\genrap\\zlecenia.ufn`);
  // console.log(new XMLParser({ ignoreAttributes: false }).parse(xmlData));
  // console.log(`---`);
  // const a = new XMLParser({ ignoreAttributes: false }).parse(xmlData) as XMLUfn.Data;
  // await promisify(fs.writeFile)('exported.json', JSON.stringify(a));
  // console.log(a.GenrapUfn.ufn);
  // console.log(Object.keys(a));
  // console.log(`---`);
})();

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { promisify } from 'util';
import { GrsExtractor, UfnExtractor } from './extractor';
import { GenericObjectOrArray, XMLParser } from 'fast-xml-parser';
import fs from 'fs';
import { XMLUfn } from './types/ufn.type';
import { cliArgsParse } from './cli';
import { CliArguments, ExportFormat } from './types/general.type';
import yargs from 'yargs';
import { Helpers } from './helpers';
import { extname } from 'path';

// import { argsParse } from './cli';

// argsParse();

(async () => {
  class ExtractorFacade {
    private isInputDir: boolean = false;
    private files: string[] = [];
    private exportFormat: ExportFormat;
    private input: string | string[] | undefined;
    private outputDir: string;

    constructor(input: string | string[] | undefined, outputDir: string, format: ExportFormat) {
      this.isInputDir = typeof input === 'string';
      this.outputDir = outputDir;
      this.input = input;
      this.exportFormat = format;
      return this;
    }

    public async extract(): Promise<void> {
      if (this.isInputDir) {
        this.files = await Helpers.getFilesFromDir(this.input as string);
      }

      this.files.forEach(async (file) => {
        const extension = extname(file).toLowerCase().split('.')[1];
        switch (extension) {
          case 'grs':
            await this.extractGrs(file, this.outputDir);
            break;
          case 'ufn':
            await this.extractUfn(file, this.outputDir);
            break;
          default:
            console.log('Err file');
        }
        console.log(`This file is: ${file} and ext is: ${extension}`);
      });
    }

    private async extractGrs(filepath: string, outputDir: string): Promise<void> {
      const grs = await new GrsExtractor().runExtractProcess(filepath);
      await grs.exportToFile(outputDir, this.exportFormat);
    }

    private async extractUfn(filepath: string, outputDir: string): Promise<void> {
      const grs = await new UfnExtractor().runExtractProcess(filepath);
      await grs.exportToFile(outputDir, this.exportFormat);
    }
  }

  const a = cliArgsParse() as CliArguments;
  const ef = new ExtractorFacade(
    Helpers.getInput(a.inputFiles, a.inputDir),
    a.outputDir as string,
    a.format as ExportFormat
  );

  ef.extract();
  console.log(a);

  // console.log(`Input: `, Helpers.getInput(a.inputFiles, a.inputDir));
  // console.log(await Helpers.getFilesFromDir(`${__dirname}\\genrap`));
})();

// const { inputFiles, outputDir, inputDir, format } = cliArgsParse() as Record<string, any>;

// console.log(inputDir);
// console.log(outputDir);
// console.log(format);
// console.log(inputFiles);

//   async () => {
// const grsExtractor = new GrsExtractor();
//     // const filepath = __dirname + `\\genrap\\TOK_PMIR_RAPORT_PPRZYL200_SI2.grs`;
//     // const extractHook = await grsExtractor.runExtractProcess(filepath);
//     // extractHook.exportToFile('C:\\Users\\dapolak\\OneDrive - Tauron\\Pulpit', 'yml');
//     // console.log(extractHook?.getExtractedData());
//     // const ufnExtractor = new UfnExtractor();
//     // const filepath = __dirname + `\\genrap\\TOK_PMIR_RAPORT_PPRZYL200_SI2.ufn`;
//     // const extractHook = await ufnExtractor.runExtractProcess(filepath);
//     // extractHook.exportToFile('C:\\Users\\dapolak\\OneDrive - Tauron\\Pulpit', 'yml');
//     // console.log(extractHook?.getExtractedData());
//     // grsExtractor.export('output.txt', JSON.stringify(result));
//   }
// )();

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

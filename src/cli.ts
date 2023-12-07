import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { exportFormatTypes } from './types/general.type';

process.argv = [
  'C:\\Program Files\\nodejs\\node.exe',
  'C:\\TestDir\\Directory\\cli.ts',
  // '-i',
  // '12333',
  // '--inputFiles',
  // '../src/exampleFiles.txt',
  // '../src/exampleFiles2.txt',
  '--inputDir',
  'src\\genrap',
  '-f',
  'yml',
  '-o',
  'C:\\Users\\damia\\d\\MYSTUFF\\devspace\\playground\\genrap-sql-extractor\\src\\genrap',
];

export const cliArgsParse = () => {
  return yargs(hideBin(process.argv))
    .usage('$ genrap-extractor [options]')
    .example('$ genrap-extractor --inputDir=<path> --outputDir=<path> --format=<format>', '')
    .options({
      i: { type: 'array', alias: 'input-files', conflicts: 'input-dir' },
      d: { type: 'string', alias: 'input-dir', conflicts: 'input-files' },
      o: { type: 'string', alias: 'output-dir', required: true },
      f: { type: 'string', alias: 'format', choices: exportFormatTypes, required: true },
    })
    .parse();
};

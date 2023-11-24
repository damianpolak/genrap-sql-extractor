import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { exportFormatTypes } from './types/general.type';

process.argv = [
  'C:\\Program Files\\nodejs\\node.exe',
  'C:\\TestDir\\Directory\\cli.ts',
  // '-i',
  // '12333',
  '-d',
  // 'asdddd',
  'asdddd2',
  '-f',
  'yml',
  '-o',
  'test',
];

const argv = yargs(process.argv.slice(2))
  .options({
    i: { type: 'array', alias: 'input-files', conflicts: 'input-dir' },
    d: { type: 'string', alias: 'input-dir', conflicts: 'input-files' },
    o: { type: 'string', alias: 'output-dir', required: true },
    f: { type: 'string', alias: 'format', choices: exportFormatTypes, required: true },
  })
  .parse();

console.log(`is argv: `, argv);

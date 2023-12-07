import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { exportFormatTypes } from './types/general.type';

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

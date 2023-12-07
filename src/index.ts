import { cliArgsParse } from './cli';
import { CliArguments, ExportFormat } from './types/general.type';
import { Helpers } from './helpers';
import { ExtractorFacade } from './extractorFacade';

(async () => {
  const cliArgs = cliArgsParse() as CliArguments;
  new ExtractorFacade(
    Helpers.getInput(cliArgs.inputFiles, cliArgs.inputDir),
    cliArgs.outputDir as string,
    cliArgs.format as ExportFormat
    // 'sd' as ExportFormat
  ).extract();
})();

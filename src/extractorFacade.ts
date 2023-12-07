import path, { extname } from 'path';
import { GrsExtractor, UfnExtractor } from './extractor';
import { Helpers } from './helpers';
import { ExportFormat, ExtractedType } from './types/general.type';

export class ExtractorFacade {
  private isInputDir: boolean = false;
  private files: string[] = [];

  constructor(
    private input: string | string[] | undefined,
    private outputDir: string,
    private exportFormat: ExportFormat
  ) {
    this.isInputDir = typeof input === 'string';
    return this;
  }

  async extract(): Promise<void> {
    this.files = this.isInputDir ? await Helpers.getFilesPathFromDir(this.input as string) : (this.input as string[]);
    this.files.forEach(async (file) => {
      const extension = extname(file).toUpperCase().split('.')[1];
      await this.extractByType(extension, file, this.outputDir, this.exportFormat);
    });
  }

  private async extractByType(type: string, filepath: string, outputDir: string, format: ExportFormat): Promise<void> {
    if (Object.keys(ExtractedType).includes(type)) {
      try {
        const extractor = type == ExtractedType.GRS ? new GrsExtractor() : new UfnExtractor();
        await (await extractor.runExtractProcess(filepath)).exportToFile(outputDir, format);
        Helpers.log('Info', `=> extracted ${path.basename(filepath)}`);
      } catch (error) {
        Helpers.log('Error', `=> not extracted ${path.basename(filepath)}`);
        Helpers.log('Error', `=> ${(error as Error).message}`);
      }
    } else {
      Helpers.log('Error', `=> not extracted ${path.basename(filepath)}`);
      Helpers.log('Error', `=> type is not grs or ufn`);
    }
  }
}

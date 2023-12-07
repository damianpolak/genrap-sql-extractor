import fs from 'fs';
import { join } from 'path';
import { promisify } from 'util';
import { LogLevel } from './types/general.type';

export class Helpers {
  static cleanify(str: string): string {
    return str.replace(/\\n/g, ' ').replace(/\s+/g, ' ');
  }

  static isDirExists(path: string): boolean {
    return fs.existsSync(path);
  }

  static getInput<T, K>(inputFiles: T, inputDir: K): T | K {
    return inputFiles ? inputFiles : inputDir;
  }

  static async getFilesPathFromDir(directory: string): Promise<string[]> {
    return (await promisify(fs.readdir)(directory)).map((file) => {
      return join(directory, file);
    });
  }

  static log(logLevel: LogLevel, data: string): void {
    console.info(`[${logLevel}] ${data}`);
  }
}

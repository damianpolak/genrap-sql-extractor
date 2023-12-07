import fs from 'fs';
import { promisify } from 'util';

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

  static async getFilesFromDir(directory: string): Promise<string[]> {
    console.log(`=== Directory: ${directory}`);
    return await promisify(fs.readdir)(directory);
  }
}

import fs from 'fs';

export class Helpers {
  static cleanify(str: string): string {
    return str.replace(/\\n/g, ' ').replace(/\s+/g, ' ');
  }

  static isDirExists(path: string): boolean {
    return fs.existsSync(path);
  }
}

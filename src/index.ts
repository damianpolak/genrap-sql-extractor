/* eslint-disable @typescript-eslint/no-unused-vars */

import { GrsExtractor, UfnExtractor } from './extractor';

(async () => {
  const grsExtractor = new GrsExtractor();
  const filepath = __dirname + `\\zlecenia.grs`;
  const extractHook = await grsExtractor.getDataFromXML(filepath);
  extractHook.export('', 'yml');
  // console.log(extractHook?.getExtractedData());
  // grsExtractor.export('output.txt', JSON.stringify(result));
})();

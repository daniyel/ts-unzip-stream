import { createReadStream } from 'fs-extra';
import { join } from 'path';
// eslint-disable-next-line import/no-extraneous-dependencies
import { mkdir as _mkdir } from 'temp';
import { callbackify, promisify } from 'util';
import { Extract, Parse } from '../index';
import dirdiff from './utils/dirdiff';

const mkdir = promisify(_mkdir);
const dirdiffCb = callbackify(dirdiff);
const testDataDir = '../../testData';

describe('uncompressed', () => {
  it('should parse uncompressed archive', () => {
    const archive = join(__dirname, testDataDir, 'uncompressed/archive.zip');

    const unzipParser = new Parse();
    createReadStream(archive).pipe(unzipParser);
    unzipParser.on('error', (err) => {
      throw err;
    });
  });

  it('should extract uncompressed archive', async () => {
    const archive = join(__dirname, testDataDir, 'uncompressed/archive.zip');
    const dirPath = await mkdir('node-unzip-');
    const unzipExtractor = new Extract({ path: dirPath });

    unzipExtractor.on('error', (err) => {
      throw err;
    });
    unzipExtractor.on('close', () => {
      dirdiffCb(
        join(__dirname, testDataDir, 'uncompressed/inflated'),
        dirPath,
        {
          fileContents: true,
        },
        (err, diffs) => {
          if (err) {
            throw err;
          }
          expect(diffs.length).toEqual(0);
        }
      );
    });

    createReadStream(archive).pipe(unzipExtractor);
  });
});

/* eslint-disable consistent-return */
import { readFile, stat } from 'fs/promises';
// eslint-disable-next-line import/no-extraneous-dependencies
import { glob } from 'glob';
import { join } from 'path';

interface Opts {
  fileContents: boolean;
}

enum ResultType {
  FILE_CONTENT_MISMATCH = 'fileContentMismatch',
  FILE_LENGTH_MISMATCH = 'fileLengthMismatch',
  FILE_MISSING = 'fileMissing',
  FILE_TYPE_MISMATCH = 'fileTypeMismatch',
}

interface Result {
  type: ResultType;
  file1: string | null;
  file2: string | null;
  pos?: number;
}

// eslint-disable-next-line max-params
const diffFile = async (dir1: string, file1: string, dir2: string, file2: string) => {
  const file1Stat = await stat(join(dir1, file1));
  const file2Stat = await stat(join(dir2, file2));

  if (file1Stat.isDirectory() && file2Stat.isDirectory()) {
    return;
  }

  if ((file1Stat.isDirectory() && !file2Stat.isDirectory()) || (!file1Stat.isDirectory() && file2Stat.isDirectory())) {
    return {
      type: ResultType.FILE_TYPE_MISMATCH,
      file1,
      file2,
    };
  }

  const file1Data = await readFile(join(dir1, file1));
  const file2Data = await readFile(join(dir2, file2));

  if (file1Data.length !== file2Data.length) {
    return {
      type: ResultType.FILE_LENGTH_MISMATCH,
      file1,
      file2,
    };
  }

  for (let i = 0; i < file1Data.length; i++) {
    if (file1Data[i] !== file2Data[i]) {
      return {
        type: ResultType.FILE_CONTENT_MISMATCH,
        file1,
        file2,
        pos: i,
      };
    }
  }
};

// eslint-disable-next-line max-params
const diffFiles = async (dir1: string, dir1Files: string[], dir2: string, dir2Files: string[], opts: Opts) => {
  const dir1FilesSorted = dir1Files.sort();
  const dir2FilesSorted = dir2Files.sort();

  const results: Result[] = [];
  let dir1Idx = 0;
  let dir2Idx = 0;

  while (!(dir1Idx >= dir1FilesSorted.length && dir2Idx >= dir2FilesSorted.length)) {
    if (
      dir1Idx < dir1FilesSorted.length &&
      dir2Idx < dir2FilesSorted.length &&
      dir1FilesSorted[dir1Idx] === dir2FilesSorted[dir2Idx]
    ) {
      if (opts.fileContents) {
        // eslint-disable-next-line no-await-in-loop
        const diff = await diffFile(dir1, dir1FilesSorted[dir1Idx], dir2, dir2FilesSorted[dir2Idx]);

        if (diff) {
          results.push(diff);
        }
        dir1Idx += 1;
        dir2Idx += 1;
      } else {
        dir1Idx += 1;
        dir2Idx += 1;
      }
    } else if (dir2Idx >= dir2FilesSorted.length || dir1FilesSorted[dir1Idx] < dir2FilesSorted[dir2Idx]) {
      results.push({
        type: ResultType.FILE_MISSING,
        file1: dir1FilesSorted[dir1Idx],
        file2: null,
      });
      dir1Idx += 1;
    } else {
      results.push({
        type: ResultType.FILE_MISSING,
        file1: null,
        file2: dir2FilesSorted[dir2Idx],
      });
      dir2Idx += 1;
    }
  }

  return results;
};

const dirdiff = async (dir1, dir2, opts) => {
  let dir1Files = await glob('**', { cwd: dir1 });
  let dir2Files = await glob('**', { cwd: dir2 });

  dir1Files = dir1Files.filter((f) => {
    return !!f;
  });
  dir2Files = dir2Files.filter((f) => {
    return !!f;
  });

  return diffFiles(dir1, dir1Files, dir2, dir2Files, opts);
};

export default dirdiff;
// eslint-disable-next-line no-underscore-dangle
const _diffFiles = diffFiles;
export { _diffFiles as diffFiles };
// eslint-disable-next-line no-underscore-dangle
const _diffFile = diffFile;
export { _diffFile as diffFile };

import { PassThrough, Transform } from 'stream';

class Entry extends PassThrough {
  path: string;

  type: string;

  isDirectory: boolean;

  constructor() {
    super();
    if (!(this instanceof Entry)) {
      // eslint-disable-next-line no-constructor-return
      return new Entry();
    }

    this.path = null;
    this.type = null;
    this.isDirectory = false;
  }

  autodrain() {
    return this.pipe(
      new Transform({
        transform: (d, e, cb) => {
          cb();
        },
      })
    );
  }
}

export default Entry;

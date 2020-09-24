const BaseError = require('./BaseError');

class Handler {
  constructor(app) {
    this.app = app;
  }

  setError(err) {
    this.err = err;
  }
  setReq(req) {
    this.req = req;
  }
  setRes(res) {
    this.res = res;
  }

  handle() {

    if (this.err instanceof BaseError) {
      return this.err.handle(this.req, this.res);
    }
    return this.res.send(this.err.stack);
  }
}

module.exports = Handler;

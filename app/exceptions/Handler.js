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
    const error = new Error(this.err);

    this.res.send(error.stack);
  }
}

module.exports = Handler;

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
    this.res.send({
      error: "an error occur",
    });
  }
}

module.exports = Handler;

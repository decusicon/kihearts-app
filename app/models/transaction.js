const Model = require("@schemas/TransactionSchema").model

class Transaction extends Model {
  get type() {
    return this.debit ? "debit" : "credit"
  }

  get amount() {
    return this.debit ? this.debit : this.credit
  }
}

module.exports.MODES = Transaction.MODES = {
  cw: "cash-wallet",
  gcw: "gold-coin-wallet",
}

module.exports = Transaction

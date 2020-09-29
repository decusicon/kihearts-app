const Transaction = require("@models/transaction")

class WalletController {
  async index(req, res, next) {
    try {
      const user = req.user

      const query = {
        model_id: user.id,
        model_type: "users",
        mode: Transaction.MODES["cw"],
      }
      const transactions = await Transaction.find(query)

      const credit = _.map(
        _.filter(transactions,(transaction) => transaction.status === 'approved'),
        'credit'
      )
      
      const debit = _.map(
        _.filter(transactions,(transaction) => transaction.status === 'approved'),
        'debit'
      )
      
      const sumCredit = _.reduce(credit, (sum, n) => sum + Number(n), 0)
      const sumDebit = _.reduce(debit, (sum, n) => sum + Number(n), 0)

      const balance = sumCredit - sumDebit

      return res.render("pages/wallet", {
        title: "Wallets",
        walletBalance: balance,
        transactions: transactions.reverse(),
      })
    } catch (error) {
      next(error)
    }
  }

  async deposit(req, res, next) {
    try {
      const user = req.user

      const validate = await req.validate({
        amount: "required",
      })

      // create transaction set status to pending
      const transaction = new Transaction({
        model_id: user.id,
        model_type: "users",
        mode: Transaction.MODES["cw"],
        status: "pending",
        credit: Number(validate.amount),
        debit: null,
        description: "Test deposit",
        meta: {},
      })

      if (!(await transaction.save())) {
        return res.status(400).json({
          message: "You've started a delivery!",
          error: null,
          data: null,
        })
      }

      // Return Delivery
      return res.status(201).json({
        message: "You've started a delivery!",
        error: null,
        data: {
          redirect_url: `/wallets/deposit`,
          public_key: process.env.FLWPUBK,
          tx_ref: transaction.id,
          amount: transaction.amount,
          name: user.name,
          phone: user.phone,
          email: user.email,
          title: "Transaction",
        },
      })
    } catch (error) {
      next(error)
    }
  }

  async verifyDeposit(req, res, next) {
    const { tx_ref, transaction_id, status } = req.query

    try {
      var transaction = await Transaction.findById(tx_ref) // query transaction out here

      if (!(transaction && transaction_id)) {
        res.redirect("/")
      }

      var flutterwaveRes = await axios.get(
        `https://api.flutterwave.com/v3/transactions/${transaction_id}/verify`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.FLWSECK}`,
          },
        }
      )

      const { amount } = flutterwaveRes.data.data

      // create getter for amount;

      if (!(status == "successful" && transaction.amount == amount)) {
        transaction.status = "rejected"
        await transaction.save()

        req.flash("error", "Payment Failed")
        return res.redirect("/wallets")
      }
      // Update transaction status here
      transaction.status = "approved"

      if (!(await transaction.save())) {
        req.flash("error", "unable to change transaction status")
        return res.redirect("/wallets")
      }

      req.flash("success", "Payment successful")
      return res.redirect("/wallets")
    } catch (err) {
      next(err)
    }
  }
}

module.exports = new WalletController()

function Payment() {}

Payment.init = () => {
  const save = async (userObj) => {
    try {
      var res = await axios.post(`/wallets/deposit`, userObj)
      return res.data
    } catch (err) {
      return err.response.data
    }
  }

  var depositBtn = document.getElementById("deposit-btn")

  if (depositBtn) {
    depositBtn.onclick = async (e) => {
      e.preventDefault()

      var walletAmount = document.getElementById("wallet-amount")

      const amount = walletAmount.value

      var res = await save({ amount })

      console.log("RES: ", res)

      Payment.makeSinglePayment({ ...res.data })
    }
  }
}

// FlutterWave Single Payment
Payment.makeSinglePayment = (paymentParams) => {
  const {
    public_key,
    redirect_url,
    tx_ref,
    amount,
    name,
    phone,
    email,
    title,
  } = paymentParams

  FlutterwaveCheckout({
    public_key,
    tx_ref,
    amount,
    currency: "NGN",
    redirect_url,
    customer: {
      name,
      email,
      phone,
    },
    customizations: {
      title: title,
      description: `Oh Yes`,
    },
  })
}

Payment.init()

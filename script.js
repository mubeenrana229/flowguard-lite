let userAddress;

// 🔗 Connect Wallet
async function connectWallet() {
  if (!window.ethereum) {
    alert("Install MetaMask");
    return;
  }

  const accounts = await window.ethereum.request({
    method: "eth_requestAccounts",
  });

  userAddress = accounts[0];

  document.getElementById("wallet").innerText =
    "Connected: " + userAddress;
}

// 🔁 Token Address Map
const tokens = {
  ETH: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
  DAI: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
  USDC: "0xA0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
  USDT: "0xdAC17F958D2ee523a2206206994597C13D831ec7"
};

// 🔄 REAL SWAP FUNCTION
async function swap() {
  if (!userAddress) {
    alert("Connect wallet first");
    return;
  }

  let from = document.getElementById("fromToken").value;
  let to = document.getElementById("toToken").value;
  let amountInput = document.getElementById("amount").value;

  if (!amountInput || amountInput <= 0) {
    alert("Enter valid amount");
    return;
  }

  // Convert ETH to wei
  let amount = (parseFloat(amountInput) * 1e18).toString();

  document.getElementById("result").innerHTML = "⏳ Preparing swap...";

  try {
    const url = `https://api.1inch.io/v5.0/1/swap?fromTokenAddress=${tokens[from]}&toTokenAddress=${tokens[to]}&amount=${amount}&fromAddress=${userAddress}&slippage=1`;

    const res = await fetch(url);
    const data = await res.json();

    if (!data.tx) {
      document.getElementById("result").innerHTML =
        "❌ Swap failed (API issue)";
      return;
    }

    const tx = {
      from: userAddress,
      to: data.tx.to,
      data: data.tx.data,
      value: data.tx.value
    };

    await window.ethereum.request({
      method: "eth_sendTransaction",
      params: [tx]
    });

    document.getElementById("result").innerHTML =
      "🚀 Swap Transaction Sent!";
  } catch (error) {
    document.getElementById("result").innerHTML =
      "❌ Error: " + error.message;
  }
}

// 💰 Load Prices
async function loadPrices() {
  let res = await fetch(
    "https://api.coingecko.com/api/v3/simple/price?ids=ethereum,tether,usd-coin,dai&vs_currencies=usd"
  );

  let data = await res.json();

  document.getElementById("prices").innerHTML =
    `ETH: $${data.ethereum.usd} <br>
     USDT: $${data.tether.usd} <br>
     USDC: $${data["usd-coin"].usd} <br>
     DAI: $${data.dai.usd}`;
}

loadPrices();
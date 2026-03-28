// 🔗 Connect Wallet
async function connectWallet() {
  if (typeof window.ethereum !== "undefined") {
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      document.getElementById("wallet").innerText =
        "Connected: " + accounts[0];

    } catch (error) {
      alert("Connection rejected");
    }
  } else {
    alert("MetaMask not detected!");
  }
}

// 💰 Get Live ETH Price
async function getPrice() {
  try {
    let res = await fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd"
    );
    let data = await res.json();
    return data.ethereum.usd;
  } catch {
    return "Error loading price";
  }
}

// 🛡️ Scam Check
function scamCheck(action) {
  if (action === "Earn") {
    return "⚠️ High returns = High risk";
  }
  return "✅ Safe";
}

// 🚀 Run Strategy
async function run() {
  let action = document.getElementById("action").value;

  let price = await getPrice();
  let safety = scamCheck(action);

  let message = `
    🔹 Action: ${action} <br>
    💰 ETH Price: $${price} <br>
    🛡️ Status: ${safety}
  `;

  document.getElementById("result").innerHTML = message;
}
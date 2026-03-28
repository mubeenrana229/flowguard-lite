let provider;
let signer;

async function connectWallet() {
  if (window.ethereum) {
    provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    signer = provider.getSigner();

    const address = await signer.getAddress();
    document.getElementById("wallet").innerText =
      "Connected: " + address;
  } else {
    alert("Please install MetaMask!");
  }
}

function run() {
  let action = document.getElementById("action").value;

  let message = "";

  if (action === "Swap") {
    message = "🔄 Ready to Swap (integration coming)";
  } 
  else if (action === "Stake") {
    message = "📈 Ready to Stake (integration coming)";
  } 
  else if (action === "Earn") {
    message = "💰 Earning Strategy Ready";
  }

  document.getElementById("result").innerHTML = message;
}
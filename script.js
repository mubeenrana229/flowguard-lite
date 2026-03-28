function connectWallet() {
  if (typeof window.ethereum !== "undefined") {

    window.ethereum.request({ method: "eth_requestAccounts" })
      .then(accounts => {
        document.getElementById("wallet").innerText =
          "Connected: " + accounts[0];
      })
      .catch(() => {
        alert("Connection rejected");
      });

  } else {
    alert("MetaMask not detected!");
  }
}
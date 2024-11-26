const html5QrCode = new Html5Qrcode("qr-reader");

document.getElementById("startScan").addEventListener("click", () => {
  html5QrCode.start({ facingMode: "environment" }, { fps: 10, qrbox: 250 },
    (decodedText, decodedResult) => {
      console.log(`QR Code detected: ${decodedText}`);
      // Assuming the QR code contains the student's email address
      sendLogData(decodedText, 'checkout');
      html5QrCode.stop(); // Stop the QR code scanning after successful scan
    },
    (errorMessage) => {
      console.error(errorMessage);
    }
  ).catch((err) => {
    console.error(err);
  });
});

document.getElementById("stopScan").addEventListener("click", () => {
  html5QrCode.stop().catch((err) => {
    console.error(err);
  });
});

function sendLogData(email, action) {
  const data = {
    email: email,
    action: action
  };
  
  fetch('https://script.google.com/macros/s/AKfycbwJw23qGa91dz6yg5YGWsVsYD6dumMdJnOljI_Pwqb9isjgZ9HIJStdBlxz0s6xjdlm/exec', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  .then(response => response.text())
  .then(data => {
    console.log('Success:', data);
  })
  .catch((error) => {
    console.error('Error:', error);
  });
}

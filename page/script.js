const html5QrCode = new Html5Qrcode("qr-reader");

document.getElementById("startScan").addEventListener("click", () => {
  html5QrCode.start({ facingMode: "environment" }, { fps: 10, qrbox: 250 },
    (decodedText, decodedResult) => {
      console.log(`QR Code detected: ${decodedText}`);
      // Assuming the QR code contains the student's email address
      sendLogData(decodedText, 'checkout');
      html5QrCode.stop(); // Stop the QR code scanning after a successful scan
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
  // The data object that will be sent to the Google Apps Script
  const data = {
    email: email,
    action: action
  };
  
  // Replace 'YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL' with your actual web app URL
  fetch('https://script.google.com/macros/s/AKfycbwJw23qGa91dz6yg5YGWsVsYD6dumMdJnOljI_Pwqb9isjgZ9HIJStdBlxz0s6xjdlm/exec', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),  // Send the data as a JSON string
  })
  .then(response => response.text())
  .then(data => {
    console.log('Success:', data);
  })
  .catch((error) => {
    console.error('Error:', error);
  });
}

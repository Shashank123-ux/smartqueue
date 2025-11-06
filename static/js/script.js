document.getElementById("getLocation").addEventListener("click", () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((pos) => {
      document.getElementById("latitude").value = pos.coords.latitude.toFixed(5);
      document.getElementById("longitude").value = pos.coords.longitude.toFixed(5);
    });
  } else {
    alert("Geolocation is not supported by your browser.");
  }
});

document.getElementById("queueForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = {
    name: document.getElementById("name").value,
    phone: document.getElementById("phone").value,
    email: document.getElementById("email").value,
    latitude: document.getElementById("latitude").value,
    longitude: document.getElementById("longitude").value
  };

  const res = await fetch("/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  const result = await res.json();
  const messageBox = document.getElementById("messageBox");

  messageBox.innerHTML = `<p>✅ ${result.message}! Your queue number is <b>${result.queue_number}</b>.</p>`;

  // Privacy: hide form after submission
  document.getElementById("queueForm").reset();
  document.getElementById("queueForm").style.display = "none";

  // Optionally, show thank you message
  messageBox.innerHTML += "<p>Thank you!</p>";
});

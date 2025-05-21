const minsToHHMM = m => `${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`;
let entryTimeMs = null;

function update() {
  chrome.storage.local.get(["totalMinutes", "timestamp"], ({ totalMinutes = 0, timestamp }) => {
    // Calculate entry time once
    if (timestamp && entryTimeMs === null) {
      entryTimeMs = timestamp - totalMinutes * 60000;
    }

    const rem = 480 - totalMinutes;
    const rEl = document.getElementById("remaining"),
          oEl = document.getElementById("logoutTime");

    if (rem <= 0) {
      rEl.textContent = "You can log out now!";
      oEl.textContent = "✅ 8 hours complete";
      return;
    }

    rEl.textContent = `${minsToHHMM(rem)} left`;

    if (entryTimeMs !== null) {
      const logout = new Date(entryTimeMs + 480 * 60000);
      oEl.textContent = "Log-out time: " + logout.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    }
  });
}

update();
chrome.storage.onChanged.addListener(update);

// Also update the countdown every minute (so time left ticks down)
setInterval(update, 60_000);

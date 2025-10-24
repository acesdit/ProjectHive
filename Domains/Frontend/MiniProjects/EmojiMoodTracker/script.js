const days = document.querySelectorAll(".day");
const emojiPicker = document.querySelector(".emoji-picker");
const resetBtn = document.getElementById("resetBtn");

let selectedDay = null;
const moods = JSON.parse(localStorage.getItem("moods")) || {};

// Load saved moods
days.forEach(day => {
  const mood = moods[day.dataset.day];
  if (mood) day.textContent = mood;
});

// Show emoji picker when clicking on a day
days.forEach(day => {
  day.addEventListener("click", () => {
    selectedDay = day.dataset.day;
    emojiPicker.classList.remove("hidden");
  });
});

// When emoji is clicked
emojiPicker.addEventListener("click", e => {
  if (e.target.tagName !== "SPAN") return;
  const emoji = e.target.textContent;
  moods[selectedDay] = emoji;
  localStorage.setItem("moods", JSON.stringify(moods));

  const dayEl = document.querySelector(`[data-day="${selectedDay}"]`);
  dayEl.textContent = emoji;
  emojiPicker.classList.add("hidden");
});

// Reset tracker
resetBtn.addEventListener("click", () => {
  localStorage.removeItem("moods");
  days.forEach(day => (day.textContent = day.dataset.day));
});

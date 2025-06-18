// Wikipedia search functionality
function searchWikipedia(query) {
  fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query)}`)
    .then(response => response.json())
    .then(data => {
      const result = document.getElementById("result");

      if (data.extract) {
        result.innerHTML = `
          <h2>${data.title}</h2>
          <p>${data.extract}</p>
          <a href="${data.content_urls.desktop.page}" target="_blank">Read more on Wikipedia</a>
        `;
      } else {
        window.open(`https://en.wikipedia.org/wiki/${query}`, "_blank");
      }
    })
    .catch(err => {
      console.error(err);
      alert("Error fetching results.");
    });
}

// Trigger search on Enter
document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("searchInput");

  input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      const query = input.value.trim();
      if (query) {
        searchWikipedia(query);
      }
    }
  });
});

// Modal functions
function openModal(type) {
  document.getElementById("authModal").style.display = "block";
  document.getElementById("formTitle").innerText = type === 'login' ? "Login" : "Signup";
}

function closeModal() {
  document.getElementById("authModal").style.display = "none";
}

function submitAuth() {
  const user = document.getElementById("username").value;
  const pass = document.getElementById("password").value;

  if (user && pass) {
    alert("Welcome, " + user + "!");
    closeModal();
  } else {
    alert("Please enter both fields.");
  }
}

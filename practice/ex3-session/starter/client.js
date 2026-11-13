const API = "http://localhost:3000";
const out = document.getElementById("out");

// Print the response status and text into the <pre> on the page.
function show(res) {
  return res.text().then((text) => (out.textContent = `${res.status}  ${text}`));
}

// credentials: "include" -> the browser sends/stores cookies on cross-origin requests
function call(path, method = "GET", body) {
  return fetch(API + path, {
    method,
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  }).then(show);
}

document.querySelectorAll("[data-user]").forEach((btn) =>
  btn.addEventListener("click", () => call("/login", "POST", { username: btn.dataset.user }))
);
document.getElementById("meBtn").addEventListener("click", () => call("/me"));
document.getElementById("adminBtn").addEventListener("click", () => call("/adminData"));
document.getElementById("logoutBtn").addEventListener("click", () => call("/logout", "POST"));

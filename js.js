
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Kazi Link</title>

<style>
body {
  font-family: Arial;
  margin: 0;
  background: #f4f4f4;
}

header {
  background: #2e7d32;
  color: white;
  text-align: center;
  padding: 15px;
}

nav {
  display: flex;
  justify-content: space-around;
  background: #1b5e20;
  padding: 10px;
}

nav a {
  color: white;
  text-decoration: none;
}

section {
  background: white;
  margin: 10px;
  padding: 15px;
  border-radius: 10px;
}

button {
  padding: 10px;
  margin-top: 5px;
  background: #2e7d32;
  color: white;
  border: none;
  cursor: pointer;
}

.tabs button {
  margin: 5px;
}

video {
  width: 100%;
  max-height: 300px;
}

input {
  padding: 8px;
  margin: 5px;
}
</style>

<!-- Firebase -->
<script src="https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/10.7.1/firebase-auth-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/10.7.1/firebase-storage-compat.js"></script>

</head>

<body>

<header>
  <h1>Kazi Link</h1>
</header>

<nav>
  <a href="#auth">Account</a>
  <a href="#talent">Talent</a>
  <a href="#marketplace">Marketplace</a>
</nav>

<!-- AUTH -->
<section id="auth">
  <h2>Login / Signup</h2>
  <input type="email" id="email" placeholder="Email"><br>
  <input type="password" id="password" placeholder="Password"><br>

  <button onclick="signup()">Sign Up</button>
  <button onclick="login()">Login</button>
  <button onclick="logout()">Logout</button>
</section>

<!-- TALENT -->
<section id="talent">
  <h2>Talent</h2>

  <div class="tabs">
    <button onclick="showTab('forYou')">For You</button>
    <button onclick="showTab('following')">Following</button>
    <button onclick="showTab('live')">Live</button>
  </div>

  <!-- Upload -->
  <input type="file" id="videoFile">
  <button onclick="uploadVideo()">Upload Video</button>

  <div id="videos"></div>

  <!-- Tabs -->
  <div id="forYou" class="tab-content"></div>
  <div id="following" class="tab-content" style="display:none;"></div>
  <div id="live" class="tab-content" style="display:none;">
    🔴 Live coming soon
  </div>
</section>

<!-- MARKETPLACE -->
<section id="marketplace">
  <h2>Marketplace</h2>

  <div>
    <h3>Phone</h3>
    <p>KES 10,000</p>
    <button onclick="pay()">Buy via M-Pesa</button>
  </div>

  <p>⚠️ Kazi Link acts as middleman for all transactions</p>
</section>

<script>
// 🔥 REPLACE WITH YOUR FIREBASE CONFIG
const firebaseConfig = {
  apiKey: "YOUR_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT",
  storageBucket: "YOUR_PROJECT.appspot.com",
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const storage = firebase.storage();

// AUTH
function signup() {
  auth.createUserWithEmailAndPassword(
    email.value,
    password.value
  ).then(() => alert("Account created"));
}

function login() {
  auth.signInWithEmailAndPassword(
    email.value,
    password.value
  ).then(() => alert("Logged in"));
}

function logout() {
  auth.signOut();
  alert("Logged out");
}

// VIDEO UPLOAD
function uploadVideo() {
  const file = document.getElementById("videoFile").files[0];
  if (!file) return alert("Select video");

  const ref = storage.ref("videos/" + file.name);

  ref.put(file).then(() => {
    ref.getDownloadURL().then(url => {
      displayVideo(url);
    });
  });
}

// DISPLAY VIDEO
function displayVideo(url) {
  const div = document.getElementById("forYou");

  const video = document.createElement("video");
  video.src = url;
  video.controls = true;

  const btn = document.createElement("button");
  btn.innerText = "💾 Save";
  btn.onclick = () => saveVideo(url);

  div.appendChild(video);
  div.appendChild(btn);
}

// SAVE VIDEO
function saveVideo(url) {
  let saved = JSON.parse(localStorage.getItem("saved")) || [];
  saved.push(url);
  localStorage.setItem("saved", JSON.stringify(saved));
  alert("Saved!");
}

// TABS
function showTab(tab) {
  document.querySelectorAll(".tab-content")
    .forEach(t => t.style.display = "none");

  document.getElementById(tab).style.display = "block";
}

// M-PESA (DEMO)
function pay() {
  alert("M-Pesa payment will be triggered here (backend needed)");
}
</script>

</body>
</html>

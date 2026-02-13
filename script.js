// --- DATABASE LOGIC ---
let currentUser = "";
let selectedCategory = "";
let isLoginMode = false; 

// 1. Handle Login/Create Account
function handleLogin() {
    const user = document.getElementById('username').value.trim();
    const pass = document.getElementById('password').value.trim();

    if (user === "" || pass === "") {
        alert("Please fill in all fields.");
        return;
    }

    if (isLoginMode) {
        const storedPassword = localStorage.getItem("user_" + user);
        if (storedPassword && storedPassword === pass) {
            currentUser = user;
            proceedToCategory();
        } else {
            alert("Invalid username or password.");
        }
    } else {
        localStorage.setItem("user_" + user, pass);
        currentUser = user;
        proceedToCategory();
    }
}

function proceedToCategory() {
    document.getElementById('user-display').innerText = currentUser;
    document.getElementById('auth-screen').style.display = 'none';
    document.getElementById('category-screen').style.display = 'block';
}

// 2. Handle Category Selection
// In your script.js
function setCategory(cat) {
    const user = document.getElementById('username').value || "Guest";
    localStorage.setItem("currentUser", user); // Save name to show on next page
    
    // Redirect based on category
    if (cat === 'Women') window.location.href = 'women.html';
    else if (cat === 'Men') window.location.href = 'men.html';
    else if (cat === 'Kids') window.location.href = 'kids.html';
    else if (cat === 'Senior') window.location.href = 'seniors.html';
}
// 3. Toggle between Login and Register
function toggleAuth(showLogin) {
    isLoginMode = showLogin;
    const btn = document.querySelector('.primary-btn');
    const toggleLink = document.getElementById('toggle-text');

    if (isLoginMode) {
        btn.innerText = "Login";
        toggleLink.innerHTML = `New? <a href="#" onclick="toggleAuth(false)" style="color: #6c5ce7; font-weight: bold; text-decoration: none;">Create account</a>`;
    } else {
        btn.innerText = "create account";
        toggleLink.innerHTML = `Already have an account? <a href="#" onclick="toggleAuth(true)" style="color: #6c5ce7; font-weight: bold; text-decoration: none;">Login here</a>`;
    }
}

// 4. Content Display Logic
function showSection(type) {
    const display = document.getElementById('content-display');
    if (type === 'defense') {
        display.innerHTML = `
            <h3>🥋 ${selectedCategory} Self-Defense</h3>
            <p>Video tutorials for ${selectedCategory} are loading...</p>
            <div style="background:#2d2d3a; padding:20px; border-radius:10px;">
                <p>1. Awareness Drill</p>
                <p>2. Basic Strike Technique</p>
            </div>`;
    } else if (type === 'fitness') {
        display.innerHTML = `
            <h3>🏋️ ${selectedCategory} Fitness</h3>
            <p>Strength drills for ${selectedCategory}:</p>
            <ul style="text-align:left;">
                <li>Quick Reaction Sprints</li>
                <li>Core Stability Exercises</li>
            </ul>`;
    } else if (type === 'checklist') {
        display.innerHTML = `
            <h3>✅ Safety Checklist</h3>
            <div style="text-align:left;">
                <p><input type="checkbox"> Shared Live Location</p>
                <p><input type="checkbox"> Phone Battery Checked</p>
                <p><input type="checkbox"> Emergency Contacts Ready</p>
            </div>`;
    }
}
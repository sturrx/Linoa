
// ==================================
// LINOA LOGIN SYSTEM
// ==================================

const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    const message = document.getElementById("loginMessage");

    if (!email || !password) {
        message.textContent = "請輸入電子郵件與密碼。";
        return;
    }

    // Demo login
    // Any non-empty valid email and password can log in.

    const profile = JSON.parse(
        localStorage.getItem("linoaProfile") || "{}"
    );

    if (!profile.name) {
        profile.name = email.split("@")[0];
    }

    profile.email = email;

    localStorage.setItem(
        "linoaProfile",
        JSON.stringify(profile)
    );

    localStorage.setItem("linoaLoggedIn", "true");

    // Go to My Page
    window.location.href = "mypage.html";

});


// Forgot Password

document.getElementById("forgotPassword")
    .addEventListener("click", function(event) {

        event.preventDefault();

        alert("請聯絡 Linoa 客服協助重設密碼。");

    });

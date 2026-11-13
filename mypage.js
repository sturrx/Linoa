
// ==================================
// LINOA MY PAGE
// ==================================


// 1. Login Check

if (localStorage.getItem("linoaLoggedIn") !== "true") {
    window.location.replace("login.html");
}


// 2. Load Member Information

let profile = JSON.parse(
    localStorage.getItem("linoaProfile") || "{}"
);

const sidebarName = document.getElementById("sidebarName");
const headerUser = document.getElementById("headerUser");

sidebarName.textContent = profile.name || "會員您好";
headerUser.textContent = profile.name || "會員中心";

document.getElementById("profileName").value =
    profile.name || "";

document.getElementById("profileEmail").value =
    profile.email || "";

document.getElementById("profilePhone").value =
    profile.phone || "";

document.getElementById("profileBirthday").value =
    profile.birthday || "";

document.getElementById("profileGender").value =
    profile.gender || "";


// 3. Sidebar Menu Switching

const sideMenus = document.querySelectorAll(".side-menu");

const contentPages = document.querySelectorAll(".content-page");

sideMenus.forEach(menu => {

    menu.addEventListener("click", function() {

        if (this.id === "logoutButton") return;

        sideMenus.forEach(item => {
            item.classList.remove("active");
        });

        contentPages.forEach(page => {
            page.classList.remove("active");
        });

        this.classList.add("active");

        const target = document.getElementById(
            this.dataset.page
        );

        target.classList.add("active");

    });

});


// 4. Save Personal Information

const profileForm = document.getElementById("profileForm");

profileForm.addEventListener("submit", function(event) {

    event.preventDefault();

    profile.name =
        document.getElementById("profileName").value.trim();

    profile.email =
        document.getElementById("profileEmail").value.trim();

    profile.phone =
        document.getElementById("profilePhone").value.trim();

    profile.birthday =
        document.getElementById("profileBirthday").value;

    profile.gender =
        document.getElementById("profileGender").value;

    localStorage.setItem(
        "linoaProfile",
        JSON.stringify(profile)
    );

    sidebarName.textContent = profile.name || "會員您好";
    headerUser.textContent = profile.name || "會員中心";

    document.getElementById("profileMessage").textContent =
        "個人資料已成功儲存！";

});


// 5. Cancel Reservation

document.getElementById("cancelReservation")
    .addEventListener("click", function() {

        const confirmCancel = confirm(
            "確定要取消這筆預約嗎？"
        );

        if (confirmCancel) {

            const status = document.querySelector(
                ".reservation-status"
            );

            status.textContent = "已取消";

            status.style.background = "#f4dddd";
            status.style.color = "#a64f4f";

            this.disabled = true;
            this.textContent = "已取消";

            alert("預約已取消。");

        }

    });


// 6. Logout

document.getElementById("logoutButton")
    .addEventListener("click", function() {

        const confirmLogout = confirm(
            "確定要登出 Linoa 會員中心嗎？"
        );

        if (confirmLogout) {

            localStorage.removeItem("linoaLoggedIn");

            window.location.href = "login.html";

        }

    });

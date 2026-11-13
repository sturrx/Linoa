
/* ==================================
   LINOA - JavaScript
================================== */

// 1. Mobile Navigation

const menuToggle = document.getElementById("menuToggle");
const navigation = document.querySelector(".navigation");

menuToggle.addEventListener("click", function () {
    navigation.classList.toggle("show");
});

// メニューをクリックしたら閉じる
document.querySelectorAll(".navigation a").forEach(function (link) {
    link.addEventListener("click", function () {
        navigation.classList.remove("show");
    });
});


// 2. Price Calculator

const searchButton = document.getElementById("searchButton");

searchButton.addEventListener("click", function () {

    const cutPrice = Number(document.getElementById("cut").value);
    const colorPrice = Number(document.getElementById("color").value);
    const permPrice = Number(document.getElementById("perm").value);

    const total = cutPrice + colorPrice + permPrice;

    const result = document.getElementById("priceResult");

    if (total === 0) {
        result.textContent = "請至少選擇一個服務項目。";
        return;
    }

    result.textContent =
        "預估總金額：NT$ " + total.toLocaleString("zh-TW");

});


/* ==================================
   SERVICE MENU JAVASCRIPT
================================== */

// 1. Menu Data

const extraHairMenus = {
    color: [
        {
            name: "透明感奶茶色染髮",
            price: "¥9,900",
            image: "https://images.unsplash.com/photo-1512316609839-ce289d3eba0a?w=500"
        },
        {
            name: "日系霧感染髮",
            price: "¥11,000",
            image: "https://images.unsplash.com/photo-1524250502761-1ac6f2e30d43?w=500"
        },
        {
            name: "韓系棕色染髮",
            price: "¥8,800",
            image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=500"
        },
        {
            name: "漂髮特殊染色",
            price: "¥15,400",
            image: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=500"
        }
    ],

    perm: [
        {
            name: "日系自然捲燙",
            price: "¥9,900",
            image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500"
        },
        {
            name: "韓系波浪燙髮",
            price: "¥12,100",
            image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=500"
        },
        {
            name: "柔順縮毛矯正",
            price: "¥13,200",
            image: "https://images.unsplash.com/photo-1524250502761-1ac6f2e30d43?w=500"
        },
        {
            name: "空氣感蓬鬆燙",
            price: "¥11,000",
            image: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=500"
        }
    ]
};


// 2. Add extra menu cards

const hairGrid = document.getElementById("hairGrid");

Object.entries(extraHairMenus).forEach(([category, menus]) => {

    menus.forEach(menu => {

        const card = document.createElement("article");
        card.className = "hair-card";
        card.dataset.category = category;

        const title = document.createElement("div");
        title.className = "hair-card-title";

        const heading = document.createElement("h3");
        heading.textContent = menu.name;

        const favorite = document.createElement("button");
        favorite.className = "favorite";
        favorite.textContent = "♡";
        favorite.setAttribute("aria-label", "加入收藏");

        title.append(heading, favorite);

        const img = document.createElement("img");
        img.src = menu.image;
        img.alt = menu.name;

        const bottom = document.createElement("div");
        bottom.className = "hair-card-bottom";

        const price = document.createElement("strong");
        price.textContent = menu.price;

        const booking = document.createElement("a");
        booking.href = "#reservation";
        booking.className = "booking-button";
        booking.textContent = "立即預約";

        bottom.append(price, booking);
        card.append(title, img, bottom);

        hairGrid.appendChild(card);
    });
});


// 3. Category Tabs

const tabs = document.querySelectorAll(".tab-button");

let currentCategory = "cut";
let showAllCards = false;

function updateHairCards() {

    const cards = document.querySelectorAll(".hair-card");

    const filteredCards = [...cards].filter(card => {
        return card.dataset.category === currentCategory;
    });

    cards.forEach(card => {
        card.classList.add("hidden-card");
    });

    filteredCards.forEach((card, index) => {

        if (showAllCards || index < 8) {
            card.classList.remove("hidden-card");
        }
    });

    const count = document.getElementById("hairCount");
    count.textContent = filteredCards.length + " Hair";

    const moreButton = document.getElementById("showMoreButton");

    moreButton.style.display =
        filteredCards.length > 8 ? "inline-block" : "none";

    moreButton.textContent =
        showAllCards ? "Show less" : "Show more hair";
}


tabs.forEach(tab => {

    tab.addEventListener("click", function () {

        tabs.forEach(item => {
            item.classList.remove("active");
        });

        this.classList.add("active");

        currentCategory = this.dataset.category;
        showAllCards = false;

        updateHairCards();
    });

});


// 4. Show More

document.getElementById("showMoreButton")
    .addEventListener("click", function () {

        showAllCards = !showAllCards;
        updateHairCards();

    });


// 5. Favorite Button

hairGrid.addEventListener("click", function(event) {

    const button = event.target.closest(".favorite");

    if (!button) return;

    button.classList.toggle("liked");

    button.textContent =
        button.classList.contains("liked") ? "♥" : "♡";

});


// Initial Display

updateHairCards();

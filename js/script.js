const menuToggle = document.getElementById("menuToggle");
const navArea = document.getElementById("navArea");

menuToggle.addEventListener("click", function(event) {
    event.stopPropagation();

    navArea.classList.toggle("active");

    const isOpen = navArea.classList.contains("active");

    menuToggle.setAttribute("aria-expanded", isOpen);
    menuToggle.textContent = isOpen ? "×" : "☰";
});

// Close menu when clicking outside
document.addEventListener("click", function(event) {
    const clickedInsideMenu = navArea.contains(event.target);
    const clickedMenuButton = menuToggle.contains(event.target);

    if (
        navArea.classList.contains("active") &&
        !clickedInsideMenu &&
        !clickedMenuButton
    ) {
        navArea.classList.remove("active");

        menuToggle.textContent = "☰";
        menuToggle.setAttribute("aria-expanded", "false");
    }
});

// Close menu when a navigation link is clicked
document.querySelectorAll("nav a").forEach(link => {
    link.addEventListener("click", function() {
        navArea.classList.remove("active");

        menuToggle.textContent = "☰";
        menuToggle.setAttribute("aria-expanded", "false");
    });
});


// =========================
// SCROLL REVEAL FOR GALLERY
// =========================

document.addEventListener("DOMContentLoaded", function () {
    const portfolioItems = document.querySelectorAll(".portfolio-item");

    // IntersectionObserver මගින් Item එක Screen එකට එනවාදැයි පරීක්ෂා කරයි
    const observerOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 0.15 // Item එකෙන් 15% ක් Screen එකට ආ පසු animate වේ
    };

    const portfolioObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {

                // එක පාරටම නොවී එකින් එක පිළිවෙලට එන්න Delay එකක් ලබා දේ
                setTimeout(() => {
                    entry.target.classList.add("reveal");
                }, index * 120);

                // එක් වරක් Animate වූ පසු නැවත Observation එක නතර කරයි
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    portfolioItems.forEach(item => {
        portfolioObserver.observe(item);
    });
});
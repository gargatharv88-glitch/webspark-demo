/* =========================================================
   WEBSPARK — JAVASCRIPT
   ========================================================= */


/* =========================================================
   INTRO ANIMATION
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const introScreen = document.getElementById("intro-screen");

    document.body.classList.add("intro-active");

    setTimeout(() => {

        if (introScreen) {
            introScreen.classList.add("intro-finished");
        }

        document.body.classList.remove("intro-active");

    }, 3100);

});


/* =========================================================
   MOBILE MENU
   ========================================================= */

const menuButton = document.getElementById("menuButton");
const mobileMenu = document.getElementById("mobileMenu");

if (menuButton && mobileMenu) {

    menuButton.addEventListener("click", () => {

        mobileMenu.classList.toggle("active");

        if (mobileMenu.classList.contains("active")) {
            menuButton.textContent = "✕";
        } else {
            menuButton.textContent = "☰";
        }

    });


    const mobileLinks = mobileMenu.querySelectorAll("a");

    mobileLinks.forEach((link) => {

        link.addEventListener("click", () => {

            mobileMenu.classList.remove("active");

            menuButton.textContent = "☰";

        });

    });

}


/* =========================================================
   FAQ ACCORDION
   ========================================================= */

const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach((item) => {

    const question = item.querySelector(".faq-question");

    if (!question) return;

    question.addEventListener("click", () => {

        const isActive = item.classList.contains("active");


        /* Close all other FAQ items */

        faqItems.forEach((otherItem) => {

            otherItem.classList.remove("active");

        });


        /* Open selected item */

        if (!isActive) {
            item.classList.add("active");
        }

    });

});


/* =========================================================
   CURRENT YEAR
   ========================================================= */

const currentYear = document.getElementById("currentYear");

if (currentYear) {

    currentYear.textContent = new Date().getFullYear();

}


/* =========================================================
   NAVBAR ACTIVE LINK
   ========================================================= */

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-links a");

function updateActiveNavigation() {

    let currentSection = "";

    sections.forEach((section) => {

        const sectionTop = section.offsetTop - 180;
        const sectionHeight = section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight
        ) {
            currentSection = section.getAttribute("id");
        }

    });


    navLinks.forEach((link) => {

        link.classList.remove("active");

        const href = link.getAttribute("href");

        if (href === `#${currentSection}`) {
            link.classList.add("active");
        }

    });

}

window.addEventListener("scroll", updateActiveNavigation);

updateActiveNavigation();


/* =========================================================
   SMOOTH SCROLL
   ========================================================= */

const allAnchorLinks = document.querySelectorAll('a[href^="#"]');

allAnchorLinks.forEach((link) => {

    link.addEventListener("click", (event) => {

        const targetId = link.getAttribute("href");

        if (!targetId || targetId === "#") return;

        const target = document.querySelector(targetId);

        if (!target) return;

        event.preventDefault();

        target.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    });

});


/* =========================================================
   SUBTLE SCROLL REVEAL
   ========================================================= */

const revealElements = document.querySelectorAll(
    ".service-card, .why-card, .portfolio-card, .pricing-card, .process-step, .expectation"
);

if ("IntersectionObserver" in window) {

    const revealObserver = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach((entry) => {

                if (!entry.isIntersecting) return;

                entry.target.classList.add("revealed");

                observer.unobserve(entry.target);

            });

        },
        {
            threshold: 0.12
        }
    );


    revealElements.forEach((element) => {

        element.classList.add("reveal-ready");

        revealObserver.observe(element);

    });

}


/* =========================================================
   POINTER GLOW EFFECT
   ========================================================= */

const serviceCards = document.querySelectorAll(".service-card");

serviceCards.forEach((card) => {

    card.addEventListener("pointermove", (event) => {

        const rect = card.getBoundingClientRect();

        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        card.style.setProperty("--mouse-x", `${x}px`);
        card.style.setProperty("--mouse-y", `${y}px`);

    });

});


/* =========================================================
   CLOSE MOBILE MENU WHEN CLICKING OUTSIDE
   ========================================================= */

document.addEventListener("click", (event) => {

    if (!mobileMenu || !menuButton) return;

    const clickedInsideMenu =
        mobileMenu.contains(event.target);

    const clickedMenuButton =
        menuButton.contains(event.target);


    if (
        mobileMenu.classList.contains("active") &&
        !clickedInsideMenu &&
        !clickedMenuButton
    ) {

        mobileMenu.classList.remove("active");

        menuButton.textContent = "☰";

    }

});


/* =========================================================
   ESC KEY — CLOSE MOBILE MENU
   ========================================================= */

document.addEventListener("keydown", (event) => {

    if (event.key !== "Escape") return;

    if (
        mobileMenu &&
        mobileMenu.classList.contains("active")
    ) {

        mobileMenu.classList.remove("active");

        if (menuButton) {
            menuButton.textContent = "☰";
        }

    }

});


/* =========================================================
   PREVENT INTRO FROM STAYING IF PAGE LOADS SLOWLY
   ========================================================= */

window.addEventListener("load", () => {

    setTimeout(() => {

        document.body.classList.remove("intro-active");

    }, 3500);

});

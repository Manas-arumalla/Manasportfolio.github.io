/* ==========================================================
   PROJECT / SECTION ANIMATIONS
========================================================== */

// Animate sections (projects, skills, about, etc.)
const animatedItems = document.querySelectorAll(
  ".project-row, .skill-card, .experience-card, .about-img, .about-text"
);

const projectObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    } else {
      entry.target.classList.remove("visible");
    }
  });
}, { threshold: 0.2 });

animatedItems.forEach(el => projectObserver.observe(el));


/* ==========================================================
   PROJECT IMAGE PARALLAX
========================================================== */
window.addEventListener("scroll", () => {
  document.querySelectorAll(".project-img img").forEach(img => {
    const speed = 0.1;
    img.style.transform = `translateY(${window.scrollY * speed}px)`;
  });
});


/* ==========================================================
   CARD TILT EFFECT (Project Cards with data-tilt)
========================================================== */
document.querySelectorAll("[data-tilt]").forEach(card => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * 5;
    const rotateY = ((x - centerX) / centerX) * -5;

    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "rotateX(0) rotateY(0)";
  });
});


/* ==========================================================
   CERTIFICATIONS SCROLL REVEAL
========================================================== */
const certCards = document.querySelectorAll(".cert-card");

const certObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible-cert");
    } else {
      entry.target.classList.remove("visible-cert");
    }
  });
}, { threshold: 0.2 });

certCards.forEach(card => certObserver.observe(card));


/* ==========================================================
   NAVBAR STYLES ON SCROLL
========================================================== */
window.addEventListener("scroll", () => {
  const nav = document.querySelector(".pill-nav");
  nav.classList.toggle("scrolled", window.scrollY > 30);
});


/* ==========================================================
   SKILLS REVEAL (Staggered Animation)
========================================================== */
const skills = document.querySelectorAll(".skill-card");

const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add("skill-visible"), index * 120);
    } else {
      entry.target.classList.remove("skill-visible");
    }
  });
}, { threshold: 0.2 });

skills.forEach(skill => skillObserver.observe(skill));


/* ==========================================================
   FOOTER FADE-IN
========================================================== */
const footer = document.querySelector(".footer");

const footerObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      footer.classList.add("footer-visible");
      footerObserver.unobserve(entry.target); // Run once
    }
  });
}, { threshold: 0.2 });

footerObserver.observe(footer);


/* ==========================================================
   NAVBAR ACTIVE LINK HIGHLIGHT + CROSS-PAGE FIX
========================================================== */
const sections = document.querySelectorAll("#home, #about, #projects, #experience, #certifications, #contact");
const navLinks = document.querySelectorAll(".pill-nav ul li a");

function updateActiveLink() {
  let current = "";
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 80;
    const sectionHeight = section.offsetHeight;
    if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
}

// Smooth scroll / redirect
navLinks.forEach(link => {
  link.addEventListener("click", (e) => {
    const targetId = link.getAttribute("href");

    if (targetId.startsWith("#")) {
      e.preventDefault();

      if (window.location.pathname.includes("projects.html")) {
        // Redirect to main page with anchor
        window.location.href = "index.html" + targetId;
      } else {
        // Smooth scroll
        const target = document.querySelector(targetId);
        if (target) {
          window.scrollTo({
            top: target.offsetTop - 60,
            behavior: "smooth"
          });
        }
      }
    }
  });
});

// Initialize active link on homepage
if (window.location.pathname.includes("index.html") || window.location.pathname === "/") {
  window.addEventListener("scroll", updateActiveLink);
  updateActiveLink();
}


/* ==========================================================
   PROJECT MODALS
========================================================== */
const projectCards = document.querySelectorAll(".project-card");
const modals = document.querySelectorAll(".modal");
const closes = document.querySelectorAll(".modal .close");

// Open modal on card click
projectCards.forEach(card => {
  card.addEventListener("click", () => {
    const projectId = card.getAttribute("data-project");
    document.getElementById(projectId).style.display = "block";
  });
});

// Close modal on X click
closes.forEach(close => {
  close.addEventListener("click", () => {
    close.closest(".modal").style.display = "none";
  });
});

// Close modal on outside click
window.addEventListener("click", (e) => {
  modals.forEach(modal => {
    if (e.target === modal) modal.style.display = "none";
  });
});


/* ==========================================================
   CONTACT ICONS & LINKS ANIMATION
========================================================== */
const contactElements = document.querySelectorAll(".contact-card i, .contact-link");

const contactObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add("visible-contact"), index * 150);
    }
  });
}, { threshold: 0.2 });

contactElements.forEach(el => contactObserver.observe(el));


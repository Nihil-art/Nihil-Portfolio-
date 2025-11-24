// Small vanilla JS to reproduce the interactivity from the React version
const mobileBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const menuIcon = document.getElementById('menuIcon');
const nav = document.getElementById('mainNav');

let isMenuOpen = false;

function setMenuIcon() {
  if (!menuIcon) return;
  if (isMenuOpen) {
    // X icon
    menuIcon.innerHTML = '<path d="M18 6L6 18M6 6l12 12" />';
    menuIcon.setAttribute('stroke-linecap','round');
    menuIcon.setAttribute('stroke-linejoin','round');
    menuIcon.setAttribute('stroke-width','2');
    menuIcon.setAttribute('fill','none');
    menuIcon.setAttribute('stroke','currentColor');
  } else {
    // Menu icon
    menuIcon.innerHTML = '<path d="M3 12h18M3 6h18M3 18h18"></path>';
  }
}

// Toggle mobile menu
if (mobileBtn) {
  mobileBtn.addEventListener('click', () => {
    isMenuOpen = !isMenuOpen;
    if (mobileMenu) mobileMenu.classList.toggle('open', isMenuOpen);
    setMenuIcon();
  });
}

// global function so inline onclick handlers work
window.scrollToSection = function (id) {
  // close mobile menu
  isMenuOpen = false;
  if (mobileMenu) mobileMenu.classList.remove('open');
  setMenuIcon();

  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
};

// Nav scroll effect
function handleNavScroll() {
  if (!nav) return;
  if (window.scrollY > 50) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
}

window.addEventListener('scroll', handleNavScroll);
window.addEventListener('load', () => {
  // set initial state
  setMenuIcon();
  handleNavScroll();
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});

// close mobile menu when a link inside is clicked
if (mobileMenu) {
  mobileMenu.addEventListener('click', (e) => {
    const target = e.target;
    if (target && target.tagName === 'BUTTON') {
      isMenuOpen = false;
      mobileMenu.classList.remove('open');
      setMenuIcon();
    }
  });
}

function openSideBar() {
  document.querySelector('.side-bar').classList.add('active');
}

function closeSideBar() {
  document.querySelector('.side-bar').classList.remove('active');
}

const sideBarLinks = document.querySelectorAll('.side-bar a');

sideBarLinks.forEach((link) => {
  link.addEventListener('click', () => {
    closeSideBar();
  });
});

const navbar = document.querySelector('.nav-bar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a, .side-bar a');

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const currentSection = entry.target.id;

      navLinks.forEach((link) => {
        const href = link.getAttribute('href');

        link.classList.toggle('active', href === `#${currentSection}`);
      });
    });
  },
  {
    rootMargin: '-40% 0px -40% 0px',
    threshold: 0,
  },
);

sections.forEach((section) => {
  sectionObserver.observe(section);
});

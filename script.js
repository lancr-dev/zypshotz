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

const animatedItems = document.querySelectorAll('.animate-item');

const animationObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
      } else {
        entry.target.classList.remove('show');
      }
    });
  },
  {
    threshold: 0.2,
  },
);

animatedItems.forEach((item) => {
  animationObserver.observe(item);
});

const counters = document.querySelectorAll('.counter');
const aboutSection = document.querySelector('.about');

let hasAnimated = false;

function animateCounter(counter) {
  const target = Number(counter.dataset.target);

  let current = 0;
  const increment = target / 100;

  const updateCounter = () => {
    current += increment;

    if (current < target) {
      counter.textContent = Math.floor(current);
      requestAnimationFrame(updateCounter);
    } else {
      counter.textContent = target;
    }
  };

  updateCounter();
}

const statsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !hasAnimated) {
        counters.forEach(animateCounter);
        hasAnimated = true;
      }

      if (!entry.isIntersecting) {
        hasAnimated = false;

        counters.forEach((counter) => {
          counter.textContent = '0';
        });
      }
    });
  },
  {
    threshold: 0.4,
  },
);

statsObserver.observe(aboutSection);

const track = document.querySelector('.carousel-track');
const cards = document.querySelectorAll('.product-card');

const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

let currentIndex = 0;
let cardsPerView = getCardsPerView();

function getCardsPerView() {
  if (window.innerWidth <= 768) return 1;

  if (window.innerWidth <= 992) return 2;

  return 3;
}

function updateCarousel() {
  cardsPerView = getCardsPerView();

  const cardWidth = cards[0].getBoundingClientRect().width;

  track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
}

nextBtn.addEventListener('click', () => {
  const maxIndex = cards.length - cardsPerView;

  if (currentIndex < maxIndex) {
    currentIndex++;

    updateCarousel();
  }
});

prevBtn.addEventListener('click', () => {
  if (currentIndex > 0) {
    currentIndex--;

    updateCarousel();
  }
});

window.addEventListener('resize', () => {
  cardsPerView = getCardsPerView();

  const maxIndex = cards.length - cardsPerView;

  if (currentIndex > maxIndex) {
    currentIndex = maxIndex;
  }

  updateCarousel();
});

updateCarousel();

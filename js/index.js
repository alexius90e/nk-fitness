// header

const headerEl = document.querySelector('.header');
const headerControlsEl = document.querySelector('.header__controls');

if (headerEl) {
  let lastScrollTop = 0;
  let ticking = false;

  function updateHeader(scrollTop) {
    if (scrollTop < 120) {
      headerEl.classList.remove('active', 'hidden');
    } else if (scrollTop >= 120 && scrollTop <= 160) {
      headerEl.classList.remove('active');
      headerEl.classList.add('hidden');
    } else {
      headerEl.classList.add('hidden');
      headerEl.classList.add('active');
    }
  }

  window.addEventListener('scroll', () => {
    lastScrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (!ticking) {
      window.requestAnimationFrame(() => {
        updateHeader(lastScrollTop);
        ticking = false;
      });
      ticking = true;
    }
  });
}

if (headerControlsEl) {
  headerControlsEl.addEventListener('click', (event) => {
    const isLoginBtn = event.target.classList.contains('header__controls-login');

    if (isLoginBtn) event.currentTarget.classList.add('header__controls_logged');
  });
}

// first-screen

const firstScreenSwiperEl = document.querySelector('.first-screen .swiper');

if (firstScreenSwiperEl) {
  const firstScreenSwiper = new Swiper(firstScreenSwiperEl, {
    slidesPerView: 1,
    spaceBetween: 32,
    loop: true,
    autoplay: {
      delay: 3000,
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
  });
}

// services

const servicesItemEls = document.querySelectorAll('.services__item');

servicesItemEls.forEach((servicesItem) => {
  servicesItem.addEventListener('click', (event) => {
    const isClose = event.target.classList.contains('services__item-details-close');
    const isDetails = event.target.classList.contains('services__item-details');
    const isMoreBtn = event.target.classList.contains('services__item-info-more-button');

    if (isMoreBtn) event.currentTarget.classList.add('active');
    if (isClose || isDetails) event.currentTarget.classList.remove('active');
  });
});

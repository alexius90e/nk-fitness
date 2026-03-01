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

const menuButton = document.querySelector('.header__controls-menu');
const mobileMenu = document.querySelector('.mobile-menu');

const notificationsButton = document.querySelector('.header__controls-notifications');
const notificationsMenu = document.querySelector('.notifications');

function openMenu(buttonEl, menuEl) {
  if (buttonEl && menuEl) {
    buttonEl.classList.add('active');
    menuEl.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeMenu(buttonEl, menuEl) {
  if (buttonEl && menuEl) {
    buttonEl.classList.remove('active');
    menuEl.classList.remove('active');
    document.body.style.overflow = null;
  }
}

closeMenu(menuButton, mobileMenu);
closeMenu(notificationsButton, notificationsMenu);

if (menuButton) {
  menuButton.addEventListener('click', (event) => {
    const isActive = event.currentTarget.classList.contains('active');
    if (!isActive) {
      closeMenu(notificationsButton, notificationsMenu);
      openMenu(menuButton, mobileMenu);
    } else {
      closeMenu(menuButton, mobileMenu);
    }
  });
}

if (mobileMenu) {
  mobileMenu.addEventListener('click', (event) => {
    const isLayout = event.target === event.currentTarget;
    const isLink = event.target.classList.contains('mobile-menu__nav-menu-item-link');
    const isDownloadLink = event.target.classList.contains('mobile-menu__download-link');
    const isSubscription = event.target.classList.contains('mobile-menu__subscription-button');

    if (isLayout || isLink || isDownloadLink || isSubscription) {
      closeMenu(menuButton, mobileMenu);
    }
  });
}

if (notificationsButton) {
  notificationsButton.addEventListener('click', (event) => {
    const isActive = event.currentTarget.classList.contains('active');
    if (!isActive) {
      closeMenu(menuButton, mobileMenu);
      openMenu(notificationsButton, notificationsMenu);
    } else {
      closeMenu(notificationsButton, notificationsMenu);
    }
  });
}

if (notificationsMenu) {
  notificationsMenu.addEventListener('click', (event) => {
    const isLayout = event.target === event.currentTarget;

    if (isLayout) {
      closeMenu(notificationsButton, notificationsMenu);
    }
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

// services list

const servicesListSwiperEl = document.querySelector('.services-list .swiper');

console.log(servicesListSwiperEl);

if (servicesListSwiperEl) {
  const servicesListSwiper = new Swiper(servicesListSwiperEl, {
    loop: true,
    slidesPerView: 1,
    spaceBetween: 24,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
  });
}

// about-tariffs

const aboutTariffsSwiperEl = document.querySelector('.about-tariffs .swiper');
const aboutTariffsPrevBtnEl = document.querySelector('.about-tariffs__heading-controls-prev');
const aboutTariffsNextBtnEl = document.querySelector('.about-tariffs__heading-controls-next');
const aboutTariffsPaginationEl = document.querySelector('.about-tariffs__pagination');

if (aboutTariffsSwiperEl) {
  const aboutTariffsSwiper = new Swiper(aboutTariffsSwiperEl, {
    loop: true,
    slidesPerView: 1,
    spaceBetween: 24,
    breakpoints: {
      320: {
        slidesPerView: 1,
      },
      577: {
        slidesPerView: 2,
      },
      992: {
        slidesPerView: 3,
      },
    },
    pagination: {
      el: aboutTariffsPaginationEl,
      clickable: true,
    },
    navigation: {
      prevEl: aboutTariffsPrevBtnEl,
      nextEl: aboutTariffsNextBtnEl,
    },
  });
}

const aboutTariffsInfoEls = document.querySelectorAll('.about-tariffs__slide-services-item-info');
const aboutTariffsEl = document.querySelector('.about-tariffs');

if (aboutTariffsEl) {
  aboutTariffsEl.addEventListener('click', (event) => {
    const isInfoButton = event.target.classList.contains(
      'about-tariffs__slide-services-item-info-button',
    );
    aboutTariffsInfoEls.forEach((el) => el.classList.remove('active'));
    if (isInfoButton) {
      const parentEl = event.target.closest('.about-tariffs__slide-services-item-info');
      parentEl.classList.add('active');
    }
  });
}

// atmosphere

const atmosphereSwiperEl = document.querySelector('.atmosphere .swiper');

if (atmosphereSwiperEl) {
  const atmosphereSwiper = new Swiper(atmosphereSwiperEl, {
    loop: true,
    slidesPerView: 1,
    spaceBetween: 24,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      prevEl: '.swiper-button-prev',
      nextEl: '.swiper-button-next',
    },
  });

  let players = [];
  function onYouTubeIframeAPIReady() {
    document.querySelectorAll('.atmosphere__slide-iframe').forEach((iframe, i) => {
      players[i] = new YT.Player(iframe);
    });
  }
  document.querySelectorAll('.atmosphere__slide-overlay-play').forEach((btn, i) => {
    btn.addEventListener('click', () => {
      const overlay = btn.closest('.atmosphere__slide-overlay');
      overlay.classList.add('hidden');
      if (players[i] && players[i].playVideo) {
        players[i].playVideo();
      }
    });
  });

  atmosphereSwiper.on('slideChange', () => {
    players.forEach((player) => {
      if (player && player.pauseVideo) player.pauseVideo();
    });
    document.querySelectorAll('.atmosphere__slide-overlay').forEach((overlay) => {
      overlay.classList.remove('hidden');
    });
  });
}

// blog

const blogArticleFavoutitesButtons = document.querySelectorAll('.blog__article-favoutites-button');

blogArticleFavoutitesButtons.forEach((button) =>
  button.addEventListener('click', (event) => event.currentTarget.classList.toggle('active')),
);

// faq

const faqMenuButtons = document.querySelectorAll('.faq__menu-item-button');
const faqBlocks = document.querySelectorAll('.faq__block');

function showBlock(target) {
  faqBlocks.forEach((block) => block.classList.remove('active'));
  const block = document.querySelector(`.faq__block[data-block="${target}"]`);
  if (block) block.classList.add('active');
}

faqMenuButtons.forEach((button) => {
  button.addEventListener('click', () => {
    faqMenuButtons.forEach((button) => button.classList.remove('active'));
    button.classList.add('active');
    showBlock(button.dataset.target);
  });
});

const activeFaqMenuButton = document.querySelector('.faq__menu-item-button.active');
if (activeFaqMenuButton) {
  showBlock(activeFaqMenuButton.dataset.target);
}

const faqItems = document.querySelectorAll('.faq__item');

function openFaqItem(faqItem) {
  const panel = faqItem.querySelector('.faq__item-panel');
  if (panel) {
    faqItem.classList.add('active');
    panel.style.maxHeight = panel.scrollHeight + 'px';
  }
}

function closeFaqItem(faqItem) {
  const panel = faqItem.querySelector('.faq__item-panel');
  if (panel) {
    faqItem.classList.remove('active');
    panel.style.maxHeight = null;
  }
}

function toggleFaqItem(faqItem) {
  if (faqItem.classList.contains('active')) {
    closeFaqItem(faqItem);
  } else {
    openFaqItem(faqItem);
  }
}

faqItems.forEach((faqItem) => {
  faqItem.addEventListener('click', (event) => {
    const isToggler = event.target.classList.contains('faq__item-toggler');
    if (isToggler) toggleFaqItem(faqItem);
  });
});

faqItems.forEach((faqItem) => {
  if (faqItem.classList.contains('active')) {
    openFaqItem(faqItem);
  }
});

window.addEventListener('resize', () => {
  faqItems.forEach((faqItem) => {
    if (faqItem.classList.contains('active')) {
      const panel = faqItem.querySelector('.faq__item-panel');
      if (panel) {
        panel.style.maxHeight = panel.scrollHeight + 'px';
      }
    }
  });
});

// cookies

const cookies = document.querySelector('.cookies');

if (cookies) {
  cookies.addEventListener('click', (event) => {
    const isAgreeBtn = event.target.classList.contains('cookies__agree-button');
    if (isAgreeBtn) event.currentTarget.classList.remove('active');
  });
}

// loader

const loader = document.querySelector('.loader');

if (loader) {
  document.body.style.overflow = 'hidden';
  loader.classList.add('active');

  setTimeout(() => {
    document.body.style.overflow = null;
    loader.classList.remove('active');
  }, 2000);
}

// departments

const departmentsSwiperEl = document.querySelector('.departments .swiper');
const departmentsPaginationEl = document.querySelector('.departments__slider-pagination');

if (departmentsSwiperEl) {
  const departmentsSwiper = new Swiper(departmentsSwiperEl, {
    loop: true,
    slidesPerView: 1,
    spaceBetween: 24,
    pagination: {
      el: departmentsPaginationEl,
      clickable: true,
    },
  });
}

// tariffs

const tariffsMenuButtons = document.querySelectorAll('.tariffs__menu-item-button');
const tariffsCards = document.querySelectorAll('.tariffs__card');

function showAllTariffsCard() {
  tariffsCards.forEach((card) => card.classList.add('active'));
}

function showTariffsCards(target) {
  tariffsCards.forEach((card) => {
    if (target === 'all') {
      card.classList.add('active');
    } else if (card.dataset.card === target) {
      card.classList.add('active');
    } else {
      card.classList.remove('active');
    }
  });
}

function hideAllTariffsCard() {
  tariffsCards.forEach((card) => card.classList.remove('active'));
}

tariffsMenuButtons.forEach((button) => {
  button.addEventListener('click', (event) => {
    tariffsMenuButtons.forEach((button) => button.classList.remove('active'));
    button.classList.add('active');
    showTariffsCards(button.dataset.target);
  });
});

const activeTariffsMenuButton = document.querySelector('.tariffs__menu-item-button.active');
if (activeTariffsMenuButton) {
  showTariffsCards(activeTariffsMenuButton.dataset.target);
}

const tariffsMoreEl = document.querySelector('.tariffs__more');
const tariffsCardsEl = document.querySelector('.tariffs__cards');

if (tariffsMoreEl) {
  tariffsMoreEl.addEventListener('click', (event) => {
    const isButton = event.target.classList.contains('tariffs__more-button');
    if (isButton) {
      tariffsCardsEl.classList.add('visible');
    }
  });
}

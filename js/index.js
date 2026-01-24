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

// about-tariffs

const aboutTariffsSwiperEl = document.querySelector('.about-tariffs .swiper');
const aboutTariffsPrevBtnEl = document.querySelector('.about-tariffs__heading-controls-prev');
const aboutTariffsNextBtnEl = document.querySelector('.about-tariffs__heading-controls-next');

if (aboutTariffsSwiperEl) {
  const aboutTariffsSwiper = new Swiper(aboutTariffsSwiperEl, {
    loop: true,
    slidesPerView: 3,
    spaceBetween: 24,
    navigation: {
      prevEl: aboutTariffsPrevBtnEl,
      nextEl: aboutTariffsNextBtnEl,
    },
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

const isNotFoundPageHidden = true;

const hiddenBlockSelectors = ['.loader', '.cookies'];
hiddenBlockSelectors.forEach((selector) => {
  const hiddenBlockEl = document.querySelector(selector);
  if (hiddenBlockEl) hiddenBlockEl.style.display = 'none';
});

// custom select

class CustomSelect {
  constructor({ element, options, defaultText = 'Показать все', onChange }) {
    this.container = element;
    this.options = options;
    this.defaultText = defaultText;
    this.value = '';
    this.onChange = onChange;

    this.render();
  }

  render() {
    this.container.classList.add('custom-select');

    this.header = document.createElement('div');
    this.header.className = 'custom-select__header';
    this.header.textContent = this.defaultText;

    this.optionsContainer = document.createElement('div');
    this.optionsContainer.className = 'custom-select__options';

    const defaultOption = this.createOption('', this.defaultText);
    this.optionsContainer.appendChild(defaultOption);

    this.options.forEach((opt) => {
      const option = this.createOption(opt.value, opt.label);
      this.optionsContainer.appendChild(option);
    });

    this.container.appendChild(this.header);
    this.container.appendChild(this.optionsContainer);

    this.addEvents();
  }

  createOption(value, label) {
    const div = document.createElement('div');
    div.className = 'custom-select__option';
    div.textContent = label;
    div.dataset.value = value;

    div.addEventListener('click', () => {
      this.value = value;
      this.header.textContent = label;
      this.container.classList.remove('open');

      if (this.onChange) {
        this.onChange(value);
      }
    });

    return div;
  }

  addEvents() {
    this.header.addEventListener('click', () => {
      this.container.classList.toggle('open');
    });

    document.addEventListener('click', (e) => {
      if (!this.container.contains(e.target)) {
        this.container.classList.remove('open');
      }
    });
  }

  getValue() {
    return this.value;
  }
}

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

// discounts

const discountsSwiperEl = document.querySelector('.discounts .swiper');

if (discountsSwiperEl) {
  const discountsSwiper = new Swiper(discountsSwiperEl, {
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

// coaches

const coachesCards = document.querySelectorAll('.coaches__card');

coachesCards.forEach((card) => {
  card.addEventListener('click', (event) => {
    const isFavouritesButton = event.target.classList.contains('coaches__card-favourites-button');
    if (isFavouritesButton) event.target.classList.toggle('active');
  });
});

const coachesStatusSelectEl = document.getElementById('coachesStatusSelect');
const coachesGenderSelectEl = document.getElementById('coachesGenderSelect');

if (coachesStatusSelectEl && coachesGenderSelectEl) {
  const coachesStatusSelect = new CustomSelect({
    element: document.getElementById('coachesStatusSelect'),
    defaultText: 'Все тренеры',
    options: [
      { value: 'personal', label: 'Персональный тренер' },
      { value: 'professional', label: 'Тренеры групповых занятий' },
      { value: 'universal', label: 'Универсальные тренера' },
    ],
  });

  const coachesGenderSelect = new CustomSelect({
    element: document.getElementById('coachesGenderSelect'),
    defaultText: 'Пол',
    options: [
      { value: 'male', label: 'Мужской' },
      { value: 'female', label: 'Женский' },
    ],
  });

  function filterCoaches() {
    const statusValue = coachesStatusSelect.value;
    const genderValue = coachesGenderSelect.value;

    coachesCards.forEach((card) => {
      const cardStatus = card.dataset.status;
      const cardGender = card.dataset.gender;

      if (statusValue === cardStatus && genderValue === cardGender) {
        card.classList.remove('hidden');
      } else if (statusValue === '' && genderValue === '') {
        card.classList.remove('hidden');
      } else if (statusValue === '' && genderValue === cardGender) {
        card.classList.remove('hidden');
      } else if (statusValue === cardStatus && genderValue === '') {
        card.classList.remove('hidden');
      } else {
        card.classList.add('hidden');
      }
    });
  }

  coachesStatusSelect.onChange = filterCoaches;
  coachesGenderSelect.onChange = filterCoaches;
}

// coach-for-groups

const coachForGroupsMenuButtons = document.querySelectorAll('.coach-for-groups__info-menu-button');
const coachForGroupsSections = document.querySelectorAll('.coach-for-groups__info-section');

function showCoachForGroupsSection(target) {
  coachForGroupsSections.forEach((section) => section.classList.remove('active'));
  const section = document.querySelector(
    `.coach-for-groups__info-section[data-section="${target}"]`,
  );
  if (section) section.classList.add('active');
}

coachForGroupsMenuButtons.forEach((button) => {
  button.addEventListener('click', () => {
    coachForGroupsMenuButtons.forEach((button) => button.classList.remove('active'));
    button.classList.add('active');
    showCoachForGroupsSection(button.dataset.target);
  });
});

const activeCoachForGroupsMenuButton = document.querySelector(
  '.coach-for-groups__info-menu-button.active',
);
if (activeCoachForGroupsMenuButton) {
  showCoachForGroupsSection(activeCoachForGroupsMenuButton.dataset.target);
}

// coach-group-training

const coachGroupTrainingSwiperEl = document.querySelector('.coach-group-training .swiper');
const coachGroupTrainingPrevBtnEl = document.querySelector(
  '.coach-group-training__heading-controls-prev',
);
const coachGroupTrainingNextBtnEl = document.querySelector(
  '.coach-group-training__heading-controls-next',
);
const coachGroupTrainingPaginationEl = document.querySelector('.coach-group-training__pagination');

if (coachGroupTrainingSwiperEl) {
  const coachGroupTrainingSwiper = new Swiper(coachGroupTrainingSwiperEl, {
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
      el: coachGroupTrainingPaginationEl,
      clickable: true,
    },
    navigation: {
      prevEl: coachGroupTrainingPrevBtnEl,
      nextEl: coachGroupTrainingNextBtnEl,
    },
  });
}

const coachGroupTrainingSlides = document.querySelectorAll('.coach-group-training__slide');

coachGroupTrainingSlides.forEach((card) => {
  card.addEventListener('click', (event) => {
    const isFavouritesButton = event.target.classList.contains(
      'coach-group-training__slide-favourites-button',
    );
    if (isFavouritesButton) event.target.classList.toggle('active');
  });
});

// schedule-group

const timeScheduleGroupSelectEl = document.getElementById('timeScheduleGroupSelect');
const trainingScheduleGroupSelectEl = document.getElementById('trainingScheduleGroupSelect');

if (timeScheduleGroupSelectEl && trainingScheduleGroupSelectEl) {
  const timeScheduleGroupSelect = new CustomSelect({
    element: timeScheduleGroupSelectEl,
    defaultText: 'Весь день',
    options: [
      { value: '10:00', label: '10:00' },
      { value: '11:00', label: '11:00' },
      { value: '13:00', label: '13:00' },
      { value: '19:00', label: '19:00' },
    ],
  });

  const trainingScheduleGroupSelect = new CustomSelect({
    element: trainingScheduleGroupSelectEl,
    defaultText: 'Все тренировки',
    options: [
      { value: '1', label: 'Тренировки #1' },
      { value: '2', label: 'Тренировки #2' },
      { value: '3', label: 'Тренировки #3' },
    ],
  });
}

const scheduleGroupDaysSwiperEl = document.querySelector('.schedule-group__days .swiper');
const scheduleGroupEventsSwiperEl = document.querySelector('.schedule-group__events .swiper');
const scheduleGroupEventsPrevEl = document.querySelector('.schedule-group__controls-prev');
const scheduleGroupEventsNextEl = document.querySelector('.schedule-group__controls-next');

if (scheduleGroupDaysSwiperEl && scheduleGroupEventsSwiperEl) {
  const thumbs = new Swiper(scheduleGroupDaysSwiperEl, {
    spaceBetween: 8,
    allowTouchMove: false,
    breakpoints: {
      320: {
        slidesPerView: 6,
        allowTouchMove: true,
      },
      577: {
        slidesPerView: 2,
        allowTouchMove: false,
      },
      993: {
        slidesPerView: 3,
        allowTouchMove: false,
      },
      1201: {
        slidesPerView: 4,
        allowTouchMove: false,
      },
    },
    watchSlidesProgress: true,
    slideToClickedSlide: true,
    navigation: {
      prevEl: scheduleGroupEventsPrevEl,
      nextEl: scheduleGroupEventsNextEl,
    },
  });

  const main = new Swiper(scheduleGroupEventsSwiperEl, {
    spaceBetween: 8,
    slidesPerView: 1,
    allowTouchMove: false,
    breakpoints: {
      320: {
        slidesPerView: 1,
        allowTouchMove: true,
      },
      577: {
        slidesPerView: 2,
        allowTouchMove: false,
      },
      993: {
        slidesPerView: 3,
        allowTouchMove: false,
      },
      1201: {
        slidesPerView: 4,
        allowTouchMove: false,
      },
    },
    thumbs: {
      swiper: thumbs,
    },
    navigation: {
      prevEl: scheduleGroupEventsPrevEl,
      nextEl: scheduleGroupEventsNextEl,
    },
  });
}


// coach-personal

const coachPersonalMenuButtons = document.querySelectorAll('.coach-personal__info-menu-button');
const coachPersonalSections = document.querySelectorAll('.coach-personal__info-section');

function showCoachPersonalSection(target) {
  coachPersonalSections.forEach((section) => section.classList.remove('active'));
  const section = document.querySelector(
    `.coach-personal__info-section[data-section="${target}"]`,
  );
  if (section) section.classList.add('active');
}

coachPersonalMenuButtons.forEach((button) => {
  button.addEventListener('click', () => {
    coachPersonalMenuButtons.forEach((button) => button.classList.remove('active'));
    button.classList.add('active');
    showCoachPersonalSection(button.dataset.target);
  });
});

const activePersonalMenuButton = document.querySelector(
  '.coach-personal__info-menu-button.active',
);
if (activePersonalMenuButton) {
  showCoachPersonalSection(activePersonalMenuButton.dataset.target);
}

// schedule-personal

const timeSchedulePersonalSelectEl = document.getElementById('timeSchedulePersonalSelect');

if (timeSchedulePersonalSelectEl ) {
  const timeSchedulePersonalSelect = new CustomSelect({
    element: timeSchedulePersonalSelectEl,
    defaultText: 'Весь день',
    options: [
      { value: '10:00', label: '10:00' },
      { value: '11:00', label: '11:00' },
      { value: '13:00', label: '13:00' },
      { value: '19:00', label: '19:00' },
    ],
  });
}

const schedulePersonalDaysSwiperEl = document.querySelector('.schedule-personal__days .swiper');
const schedulePersonalEventsSwiperEl = document.querySelector('.schedule-personal__events .swiper');
const schedulePersonalEventsPrevEl = document.querySelector('.schedule-personal__controls-prev');
const schedulePersonalEventsNextEl = document.querySelector('.schedule-personal__controls-next');

if (schedulePersonalDaysSwiperEl && schedulePersonalEventsSwiperEl) {
  const thumbs = new Swiper(schedulePersonalDaysSwiperEl, {
    spaceBetween: 8,
    allowTouchMove: false,
    breakpoints: {
      320: {
        slidesPerView: 6,
        allowTouchMove: true,
      },
      577: {
        slidesPerView: 2,
        allowTouchMove: false,
      },
      993: {
        slidesPerView: 3,
        allowTouchMove: false,
      },
      1201: {
        slidesPerView: 4,
        allowTouchMove: false,
      },
    },
    watchSlidesProgress: true,
    slideToClickedSlide: true,
    navigation: {
      prevEl: schedulePersonalEventsPrevEl,
      nextEl: schedulePersonalEventsNextEl,
    },
  });

  const main = new Swiper(schedulePersonalEventsSwiperEl, {
    spaceBetween: 8,
    slidesPerView: 1,
    allowTouchMove: false,
    breakpoints: {
      320: {
        slidesPerView: 1,
        allowTouchMove: true,
      },
      577: {
        slidesPerView: 2,
        allowTouchMove: false,
      },
      993: {
        slidesPerView: 3,
        allowTouchMove: false,
      },
      1201: {
        slidesPerView: 4,
        allowTouchMove: false,
      },
    },
    thumbs: {
      swiper: thumbs,
    },
    navigation: {
      prevEl: schedulePersonalEventsPrevEl,
      nextEl: schedulePersonalEventsNextEl,
    },
  });
}
const translations = {
  ua: {
    nav_home: "Головна",
    nav_services: "Послуги",
    nav_projects: "Проекти",
    nav_about: "Про нас",
    nav_consult: "Замовити консультацію",
    nav_contacts: "Контакти",
    hero_title: "Наші послуги<br />Електромонтажних&nbsp;робіт",
    hero_sub: "Ваша довіра — наш результат",
    hero_btn_services: "Послуги",
    hero_btn_contacts: "Контакти",
    section_about: "Про компанію",
    about_text:
      "<strong class=\"brand-orange\">ТОВ «TEKS ENERGY»</strong> — компанія офіційно<br />зареєстрована у 2024 році, її створення<br />стало логічним кроком об'єднання<br />багаторічного практичного досвіду<br />двох ключових гравців енергетичного<br />сектору Центральної України.",
    more_btn: "Детальніше",
    section_services: "Послуги компанії",
    service_1: "Інженерні мережі<br />та захист",
    service_2: "Підключення<br />до електричних<br />мереж",
    service_3: "Будивніцтво<br />та реконструкція<br />підстанцій",
    service_4: "Встановлення<br />та підключення<br />генераторів",
    service_5: "Відновлювана<br />Енергетика",
    service_6: "Електротехнічна<br />Лабораторія",
    order_service: "Замовити послугу",
    section_projects: "Реалізовані проєкти",
    projects_page_title: "Реалізовані проєкти",
    project_view: "Переглянути проект",
    project_catalog_1: "Городище.<br />Встановлення вежі звʼязку",
    project_catalog_2: "СЕС «Еко-Поле»",
    project_catalog_3: "Водогін для ТРЦ<br />«Магніт»",
    project_catalog_4: "Лінія 110 кВ<br />«Південна»",
    project_catalog_5: "Модернізація<br />РП 6 кВ",
    svitoch_intro: "Ми забезпечуємо повний спектр інженерно-будівельних послуг, необхідних для створення та модернізації енергетичних об'єктів та інфраструктури.",
    svitoch_direction_label: "Напрямок 01:",
    svitoch_direction_value: "Інженерні мережі та захист",
    svitoch_description: "Це ядро нашої діяльності, що включає роботи з будівництва, реконструкції та обслуговування ключових елементів електромережі.",
    svitoch_feature_1: "Силові кабельні лінії в кабельних каналах, трубах та відкритого типу.",
    svitoch_feature_2: "Повітряні лінії електропередачі під напругою (до 110 кВ).",
    svitoch_feature_3: "Системи релейного захисту.",
    svitoch_feature_4: "Підстанції ТП/КТП/РП.",
    svitoch_feature_5: "Системи телемеханіки підстанцій (SCADA-системи).",
    svitoch_feature_6: "Автоматизована система контролю та обліку енергоресурсів (АСКОЕ).",
    connection_intro: "Ми забезпечуємо повний спектр інженерно-будівельних послуг, необхідних для створення та модернізації енергетичних об'єктів та інфраструктури.",
    connection_direction_label: "Напрямок 02:",
    connection_direction_value: "Підключення<br />до електричних<br />мереж",
    connection_description: "Надаємо комплексні послуги з легалізації та збільшення потужностей.",
    connection_feature_1: "Проєктуємо мережі для стандартного та нестандартного підключення.",
    connection_feature_2: "Аналіз географічних і технічних параметрів об'єкта.",
    connection_feature_3: "Збільшення електричної потужності об’єктів будь-якої складності.",
    substations_direction_label: "Напрямок 03:",
    substations_direction_value: "Будивніцтво<br />та реконструкція<br />підстанцій",
    substations_description: "Ми проектуємо, будуємо і вводимо в експлуатацію трансформаторні підстанції різних класів напруги.",
    substations_feature_1: "0,4 / 6 / 10 / 35 / 110 кВ.",
    substations_feature_2: "Комплектні трансформаторні підстанції (КТП).",
    substations_feature_3: "Розподільчі пристрої закритого і відкритого типу (РП).",
    generators_direction_label: "Напрямок 04:",
    generators_direction_value: "Встановлення та підключення генераторів",
    generators_description: "Комплексна реалізація інженерних рішень для житлової, комерційної та промислової інфраструктури.",
    generators_feature_1: "Проєктування, підключення та реконструкція систем резервного живлення.",
    generators_feature_2: "Будівництво та модернізація систем водовідведення й електроживлення генераторних майданчиків.",
    generators_feature_3: "Налаштування автоматики запуску та інтеграція генераторів у діючу інфраструктуру.",
    renewable_direction_label: "Напрямок 05:",
    renewable_direction_value: "Відновлювана енергетика",
    renewable_description: "Рішення «під ключ» для інвестиційних проєктів у сфері «зеленої» енергетики.",
    renewable_feature_1: "Будівництво промислових сонячних електростанцій (СЕС).",
    renewable_feature_2: "Будівництво індивідуальних сонячних електростанцій (для бізнесу та приватних осіб).",
    renewable_feature_3: "Підключення до мережі та повне оформлення «зеленого» тарифу.",
    laboratory_direction_label: "Напрямок 06:",
    laboratory_direction_value: "Електротехнічна лабораторія",
    laboratory_description: "Гарантія безпеки та надійності.<br /><br />Власна лабораторія для проведення випробувань та контролю якості.",
    laboratory_feature_1: "Тестування та перевірка електричних мереж.",
    laboratory_feature_2: "Випробування встановленого обладнання та систем релейного захисту.",
    laboratory_feature_3: "Оформлення технічних звітів перед здачею об'єкта в експлуатацію.",
    contacts_page_title: "Наші контакти",
    contacts_address: "м. Черкаси, вул. Хрещатик, 219",
    contacts_email: "teksenergy.company@gmail.com",
    contacts_phone: "+380 98 275 70 54",
    contacts_telegram: "telegram",
    contacts_whatsapp: "WhatsApp",
    contacts_viber: "Viber",
    project_title: "Приєднання<br />когенераційних<br />установок",
    section_standards: "Наші стандарти роботи",
    standard_1_title: "Гарантована якість",
    standard_1_text: "Тільки сертифіковані матеріали, що пройшли перевірку на реальних будівельних об’єктах. Ми обираємо те, чому довіряють професіонали.",
    standard_2_title: "Фахова допомога",
    standard_2_text: "Наші експерти допоможуть розрахувати об’єм матеріалів та підберуть оптимальні рішення для вашого технічного завдання.",
    standard_3_title: "Швидка доставка",
    standard_3_text: "Оперативно доставляємо замовлення у будь-яке місто України.",
    standard_4_title: "Справедлива ціна",
    standard_4_text: "Прозоре ціноутворення без націнок і прихованих платежів.",
    section_cta: "Замовити послугу",
    form_name_label: "Ваше ім'я",
    form_name_placeholder: "Ваше імʼя",
    form_phone_label: "Телефон",
    form_phone_placeholder: "+380 00 000 00 00",
    form_service_label: "Оберіть послугу",
    form_option_placeholder: "Оберіть послугу",
    form_option_1: "Інженерні мережі та системи",
    form_option_2: "Підключення та реконструкція мереж",
    form_option_3: "Будівництво підприємств",
    form_option_4: "Відновлювана енергетика",
    form_submit: "Залишити заявку",
    footer_tagline: "Енергетичні рішення, яким довіряють.",
    footer_company: "Компанія",
    footer_order: "Замовити",
    footer_services: "Наші послуги",
    footer_links: "Інші посилання",
    footer_link_1: "Політика конфіденційності",
    footer_link_2: "Умови та положення",
    footer_link_3: "Послуги",
    footer_link_4: "Публікації",
    footer_link_5: "Центр обробки даних",
    footer_link_6: "Страхування",
    footer_copy: "©2026 TEKS ENERGY.",
    footer_service_1: "Інженерні мережі та захист",
    footer_service_2: "Підключення до електричних мереж",
    footer_service_3: "Будивніцтво та реконструкція підстанцій",
    footer_service_4: "Встановлення та підключення генераторів",
    footer_service_5: "Відновлювана Енергетика",
    footer_service_6: "Електротехнічна Лабораторія",
    footer_address: "18000, Україна, м. Черкаси,<br />вул. Енергетиків, 10",
  },
  en: {
    nav_home: "Home",
    nav_services: "Services",
    nav_projects: "Projects",
    nav_about: "About",
    nav_consult: "Request a consultation",
    nav_contacts: "Contacts",
    hero_title: "Our services<br />Electrical&nbsp;installation works",
    hero_sub: "Your trust is our result",
    hero_btn_services: "Services",
    hero_btn_contacts: "Contacts",
    section_about: "About the company",
    about_text:
      "<strong class=\"brand-orange\">TEKS ENERGY LLC</strong> was officially registered in 2012 and specializes in creating, commissioning, and supporting energy and engineering systems projects.\nWe operate across Ukraine and provide a full cycle of works.",
    more_btn: "Learn more",
    section_services: "Company services",
    service_1: "Engineering networks<br />and systems",
    service_2: "Connection<br />and reconstruction of networks",
    service_3: "Construction<br />and reconstruction of facilities",
    service_4: "Installation<br />and connection<br />of generators",
    service_5: "Renewable<br />energy",
    service_6: "Electrical testing<br />laboratory",
    order_service: "Order a service",
    section_projects: "Completed projects",
    projects_page_title: "Completed projects",
    project_view: "View project",
    project_catalog_1: "Horodyshche.<br />Communication tower installation",
    project_catalog_2: "Eco-Field solar plant",
    project_catalog_3: "Water pipeline for<br />Magnit mall",
    project_catalog_4: "110 kV line<br />“Pivdenna”",
    project_catalog_5: "Modernization of<br />6 kV switchgear",
    svitoch_intro: "We provide a full range of engineering and construction services required for the creation and modernization of energy facilities and infrastructure.",
    svitoch_direction_label: "Direction 01:",
    svitoch_direction_value: "Engineering networks and protection",
    svitoch_description: "This is the core of our activity, covering construction, reconstruction, and maintenance of key power-grid elements.",
    svitoch_feature_1: "Power cable lines in cable ducts, pipes, and open trays.",
    svitoch_feature_2: "Overhead power transmission lines under voltage (up to 110 kV).",
    svitoch_feature_3: "Relay protection systems.",
    svitoch_feature_4: "Transformer and distribution substations.",
    svitoch_feature_5: "Substation telemechanics systems (SCADA systems).",
    svitoch_feature_6: "Automated monitoring and metering system for energy resources (ASKOE).",
    connection_intro: "We provide a full range of engineering and construction services required for the creation and modernization of energy facilities and infrastructure.",
    connection_direction_label: "Direction 02:",
    connection_direction_value: "Connection to electrical networks",
    connection_description: "We provide comprehensive services for legalization and capacity increase.",
    connection_feature_1: "We design networks for standard and non-standard connection.",
    connection_feature_2: "Analysis of the facility's geographical and technical parameters.",
    connection_feature_3: "Increase of electrical capacity for facilities of any complexity.",
    substations_direction_label: "Direction 03:",
    substations_direction_value: "Construction and reconstruction of substations",
    substations_description: "We design, build, and commission transformer substations of various voltage classes.",
    substations_feature_1: "0.4 / 6 / 10 / 35 / 110 kV.",
    substations_feature_2: "Packaged transformer substations (KTP).",
    substations_feature_3: "Indoor and outdoor switchgear units (RP).",
    generators_direction_label: "Direction 04:",
    generators_direction_value: "Installation and connection of generators",
    generators_description: "Comprehensive implementation of engineering solutions for residential, commercial, and industrial infrastructure.",
    generators_feature_1: "Design, connection, and reconstruction of backup power systems.",
    generators_feature_2: "Construction and modernization of drainage and power supply systems for generator sites.",
    generators_feature_3: "Setup of automatic start systems and integration of generators into existing infrastructure.",
    renewable_direction_label: "Direction 05:",
    renewable_direction_value: "Renewable energy",
    renewable_description: "Turnkey solutions for investment projects in the field of green energy.",
    renewable_feature_1: "Construction of industrial solar power plants (SPP).",
    renewable_feature_2: "Construction of individual solar power plants (for businesses and private customers).",
    renewable_feature_3: "Grid connection and full processing of the green tariff.",
    laboratory_direction_label: "Direction 06:",
    laboratory_direction_value: "Electrical laboratory",
    laboratory_description: "Guarantee of safety and reliability.<br /><br />Own laboratory for testing and quality control.",
    laboratory_feature_1: "Testing and inspection of electrical networks.",
    laboratory_feature_2: "Testing of installed equipment and relay protection systems.",
    laboratory_feature_3: "Preparation of technical reports before commissioning the facility.",
    contacts_page_title: "Our contacts",
    contacts_address: "Cherkasy, 219 Khreshchatyk St.",
    contacts_email: "teksenergy.company@gmail.com",
    contacts_phone: "+380 98 275 70 54",
    contacts_telegram: "telegram",
    contacts_whatsapp: "WhatsApp",
    contacts_viber: "Viber",
    project_title: "Connection of cogeneration units",
    section_standards: "Our work standards",
    standard_1_title: "Guaranteed quality",
    standard_1_text: "We use certified materials and perform work in compliance with standards.",
    standard_2_title: "Professional support",
    standard_2_text: "We provide consultations, project solutions, and support at every stage.",
    standard_3_title: "Fast delivery",
    standard_3_text: "We organize equipment and material logistics without delays.",
    standard_4_title: "Fair pricing",
    standard_4_text: "Transparent pricing and optimal solutions with no hidden costs.",
    section_cta: "Order a service",
    form_name_label: "Your name",
    form_name_placeholder: "Name",
    form_phone_label: "Phone",
    form_phone_placeholder: "+380 00 000 00 00",
    form_service_label: "Choose a service",
    form_option_placeholder: "Choose a service",
    form_option_1: "Engineering networks and systems",
    form_option_2: "Connection and reconstruction of networks",
    form_option_3: "Construction of facilities",
    form_option_4: "Renewable energy",
    form_submit: "Send request",
    footer_tagline: "Energy solutions you can trust.",
    footer_company: "Company",
    footer_order: "Order",
    footer_services: "Our services",
    footer_links: "OTHER LINKS",
    footer_link_1: "Privacy policy",
    footer_link_2: "Terms and conditions",
    footer_link_3: "Services",
    footer_link_4: "Publications",
    footer_link_5: "Data center",
    footer_link_6: "Insurance",
    footer_copy: "©2026 TEKS ENERGY.",
    footer_service_1: "Engineering networks",
    footer_service_2: "Network connection",
    footer_service_3: "Electrical testing lab",
    footer_service_4: "Installation and connection of generators",
    footer_service_5: "Renewable energy",
    footer_service_6: "Electrical testing laboratory",
    footer_address: "Kyiv, Prykladna St. 10",
  },
};

const applyLanguage = (lang) => {
  const dict = translations[lang] || translations.ua;
  document.documentElement.lang = lang === "en" ? "en" : "uk";

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.dataset.i18n;
    if (dict[key]) {
      el.innerHTML = dict[key];
    }
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    const key = el.dataset.i18nPlaceholder;
    if (dict[key]) {
      el.setAttribute("placeholder", dict[key]);
    }
  });
};

const langButtons = document.querySelectorAll(".lang-pill[data-lang]");
langButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const lang = button.dataset.lang;
    langButtons.forEach((btn) => btn.classList.toggle("is-active", btn === button));
    applyLanguage(lang);
    localStorage.setItem("teks-lang", lang);
  });
});

const savedLang = localStorage.getItem("teks-lang") || "ua";
applyLanguage(savedLang);
langButtons.forEach((btn) => btn.classList.toggle("is-active", btn.dataset.lang === savedLang));

const phoneInput = document.querySelector('.cta-form input[type="tel"]');
if (phoneInput) {
  const prefix = "+380 ";
  const formatPhone = (value) => {
    let digits = value.replace(/\D/g, "");
    if (digits.startsWith("380")) {
      digits = digits.slice(3);
    }
    if (digits.startsWith("0")) {
      digits = digits.slice(1);
    }
    digits = digits.slice(0, 9);
    const groups = [2, 3, 2, 2];
    const parts = [];
    let idx = 0;
    for (const size of groups) {
      if (digits.length > idx) {
        parts.push(digits.slice(idx, idx + size));
        idx += size;
      }
    }
    return prefix + parts.join(" ");
  };

  const updatePhone = () => {
    phoneInput.value = formatPhone(phoneInput.value);
  };

  phoneInput.addEventListener("input", updatePhone);
  updatePhone();
}

const hero = document.querySelector(".hero");
if (hero) {
  const updateHeroCover = () => {
    const maxScroll = hero.offsetHeight * 0.8;
    const scrolled = Math.min(window.scrollY, maxScroll);
    const progress = maxScroll > 0 ? scrolled / maxScroll : 0;
    const cover = `${(progress * 100).toFixed(1)}%`;
    const scale = Math.max(0.6, 1 - progress * 0.4).toFixed(3);
    const coverPx = progress * hero.offsetHeight;
    const shift = -(coverPx * 0.9);
    hero.style.setProperty("--hero-cover", cover);
    hero.style.setProperty("--hero-scale", scale);
    hero.style.setProperty("--hero-shift", `${shift.toFixed(1)}px`);
  };

  updateHeroCover();
  window.addEventListener("scroll", updateHeroCover, { passive: true });
  window.addEventListener("resize", updateHeroCover);
}

const projectsPanel = document.querySelector(".projects-panel");
const projectsTrack = document.querySelector(".projects-track");

if (projectsPanel && projectsTrack) {
  let isProjectAnimating = false;
  const projectSlideTransition = "transform 0.92s cubic-bezier(0.16, 1, 0.3, 1)";

  const getProjectCards = () => [...projectsTrack.querySelectorAll(".project-card")];

  const getVisibleProjectsCount = () => {
    const rawValue = getComputedStyle(projectsPanel).getPropertyValue("--projects-visible").trim();
    const parsedValue = parseInt(rawValue, 10);
    return Number.isFinite(parsedValue) && parsedValue > 0 ? parsedValue : 3;
  };

  const updateProjectStates = () => {
    const visibleCount = getVisibleProjectsCount();
    const trailingIndex = visibleCount === 1 ? 0 : visibleCount - 1;
    const dimFromIndex = visibleCount === 1 ? 1 : visibleCount - 1;

    getProjectCards().forEach((card, index) => {
      card.classList.toggle("is-trailing", index === trailingIndex);
      card.classList.toggle("is-dimmed", index >= dimFromIndex);
    });
  };

  const slideProjectsNext = () => {
    if (isProjectAnimating) {
      return;
    }

    const cards = getProjectCards();
    if (cards.length <= 1) {
      updateProjectStates();
      return;
    }

    const firstCard = cards[0];
    const trackStyles = getComputedStyle(projectsTrack);
    const gap = parseFloat(trackStyles.columnGap || trackStyles.gap || "0");
    const slideStep = firstCard.getBoundingClientRect().width + gap;

    if (!slideStep) {
      return;
    }

    isProjectAnimating = true;
    projectsTrack.style.transition = projectSlideTransition;

    requestAnimationFrame(() => {
      projectsTrack.style.transform = `translate3d(-${slideStep}px, 0, 0)`;
    });

    const handleTransitionEnd = (event) => {
      if (event.target !== projectsTrack) {
        return;
      }

      projectsTrack.removeEventListener("transitionend", handleTransitionEnd);
      projectsTrack.style.transition = "none";
      projectsTrack.appendChild(firstCard);
      projectsTrack.style.transform = "translate3d(0, 0, 0)";

      // Force the browser to apply the reset before re-enabling transitions.
      void projectsTrack.offsetWidth;

      projectsTrack.style.transition = "";
      updateProjectStates();
      isProjectAnimating = false;
    };

    projectsTrack.addEventListener("transitionend", handleTransitionEnd);
  };

  projectsTrack.addEventListener("click", (event) => {
    const nextButton = event.target.closest(".project-next-btn");
    if (!nextButton) {
      return;
    }

    slideProjectsNext();
  });

  updateProjectStates();
  window.addEventListener("resize", updateProjectStates);
}

const projectsPaginationLinks = document.querySelectorAll(".projects-pagination__item");
if (projectsPaginationLinks.length) {
  projectsPaginationLinks.forEach((link) => {
    link.addEventListener("click", () => {
      projectsPaginationLinks.forEach((item) => item.classList.toggle("is-active", item === link));
    });
  });
}

const API_URL = "https://teks-energy-api.onrender.com";
const PLACEHOLDER = "https://placehold.co/600x400?text=No+Image";

async function fetchProjects() {
    const container = document.getElementById('projects-container');
    if (!container) return;

    try {
        const response = await fetch(`${API_URL}/content`);
        const projects = await response.json();
        
        container.innerHTML = ''; 

        projects.forEach(project => {
            const projectHTML = `
                <article class="catalog-project">
                    <div class="catalog-project__info">
                        <h2 class="catalog-project__title">${project.title}</h2>
                        <span class="catalog-project__accent"></span>
                        <button class="catalog-project__button" 
                                onclick="window.location.href='project_detail.html?id=${project.id}'" 
                                type="button">
                            Переглянути проект
                        </button>
                    </div>
                    <div class="catalog-project__media">
                        <div class="catalog-project__frame">
                            <img src="${project.image_url || PLACEHOLDER}" 
                                 onerror="this.onerror=null;this.src='${PLACEHOLDER}';" 
                                 alt="${project.title}">
                        </div>
                    </div>
                </article>
            `;
            container.insertAdjacentHTML('beforeend', projectHTML);
        });
    } catch (error) {
        console.error("Помилка завантаження списку проєктів:", error);
    }
}

async function renderProjectDetail() {
    const titleEl = document.getElementById('detail-title');
    const descEl = document.getElementById('detail-description');
    const mainImg = document.getElementById('detail-main-img');
    const galleryContainer = document.getElementById('detail-gallery');

    if (!titleEl) return;

    const params = new URLSearchParams(window.location.search);
    const projectId = params.get('id');
    if (!projectId) {
        console.error("ID проєкту не знайдено в URL");
        return;
    }

    try {
        const response = await fetch(`${API_URL}/content`);
        if (!response.ok) throw new Error("Не вдалося отримати дані з сервера");
        
        const projects = await response.json();
        const project = projects.find(p => p.id == projectId);

        if (project) {
            console.log("Проєкт знайдено:", project);

            titleEl.innerHTML = project.title;
            if (descEl) descEl.innerText = project.body;

            if (mainImg) {
                mainImg.src = project.image_url || PLACEHOLDER;
                mainImg.onerror = () => { mainImg.src = PLACEHOLDER; };
            }

            if (galleryContainer) {

                const mainItem = galleryContainer.querySelector('.project-showcase__gallery-item--main');

                galleryContainer.innerHTML = '';

                if (mainItem) {
                    galleryContainer.appendChild(mainItem);
                }

                if (project.additional_images && project.additional_images.trim().length > 0) {
                    const images = project.additional_images.split(',');

                    images.forEach(imgUrl => {
                        const url = imgUrl.trim();
                        // Перевірка на валідність посилання
                        if (url && url !== "undefined" && url !== "null") {
                            const itemDiv = document.createElement('div');
                            itemDiv.className = 'project-showcase__gallery-item';
                            
                            const img = document.createElement('img');
                            img.src = url;
                            img.alt = "Додаткове фото об'єкта";
                            img.loading = "lazy";
                            img.onerror = () => itemDiv.remove();

                            itemDiv.appendChild(img);
                            galleryContainer.appendChild(itemDiv);
                        }
                    });
                } else {
                    console.log("Додаткові зображення для цього проєкту відсутні.");
                }
            }
        } else {
            titleEl.innerText = "Проєкт не знайдено";
        }
    } catch (error) {
        console.error("Помилка під час рендеру деталей проєкту:", error);
        if (titleEl) titleEl.innerText = "Помилка завантаження";
    }
}
document.addEventListener('DOMContentLoaded', () => {
    fetchProjects();
    renderProjectDetail();
});

document.addEventListener('DOMContentLoaded', () => {
    const appForm = document.getElementById('main-application-form');

    if (appForm) {
        appForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const appData = {
                user_name: document.getElementById('app-name').value,
                user_phone: document.getElementById('app-phone').value,
                service_type: document.getElementById('app-service').value
            };

            try {
                const response = await fetch(`${API_URL}/applications`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(appData)
                });

                if (response.ok) {
                    alert("Дякуємо! Ваша заявка прийнята. Ми зв'яжемося з вами найближчим часом.");
                    appForm.reset();
                } else {
                    alert("Помилка при відправці. Спробуйте пізніше.");
                }
            } catch (error) {
                console.error("Помилка відправки заявки:", error);
                alert("Сервер недоступний.");
            }
        });
    }
});
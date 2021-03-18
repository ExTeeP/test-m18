'use strict';

// Слайдер
(function () {
	const caruselSection = document.querySelector('.carusel');
	const caruselTrack = caruselSection.querySelector('.carusel__slides');
	const caruselItems = caruselSection.querySelectorAll('.carusel__slide');
	const caruselBtnPrev = caruselSection.querySelector('.carusel__nav-button--prev');
	const caruselBtnNext = caruselSection.querySelector('.carusel__nav-button--next');

	const stepValue = caruselItems[0].clientWidth;
	const minTrackValue = 0;
	const maxTrackValue = (caruselItems.length - 1) * stepValue;

	const getActiveSlide = () => {
		return Array.from(caruselItems)
			.findIndex((it) => it.classList.contains('carusel__slide--active'))
	};

	let activeSlide = getActiveSlide();
	let offsetValue = -(activeSlide * stepValue);

	const setOffset = () => caruselTrack.style.left = `${offsetValue}px`;

	const setActiveSlide = (isNextButton = false) => {
		if (isNextButton) {
			activeSlide++
			caruselItems[activeSlide - 1].classList.remove('carusel__slide--active');
			caruselItems[activeSlide].classList.add('carusel__slide--active');
		} else {
			activeSlide--
			caruselItems[activeSlide + 1].classList.remove('carusel__slide--active');
			caruselItems[activeSlide].classList.add('carusel__slide--active');
		}
	};

	const disabledButtons = (btn) => {
		btn.disabled = true;
		btn.classList.add('carusel__nav-button--disabled');
	};

	const undisabledButton = (btn) => {
		btn.disabled = false;
		btn.classList.remove('carusel__nav-button--disabled');
	};

	const checkButtons = () => {
			offsetValue === minTrackValue ? disabledButtons(caruselBtnPrev) : undisabledButton(caruselBtnPrev)
			offsetValue <= -maxTrackValue ? disabledButtons(caruselBtnNext) : undisabledButton(caruselBtnNext);
	};

	caruselBtnPrev.addEventListener('click', () => {
		offsetValue += stepValue;

		setOffset();
		checkButtons();
		setActiveSlide();
		getActiveSlide();
	});

	caruselBtnNext.addEventListener('click', () => {
		offsetValue -= stepValue;

		setOffset();
		checkButtons();
		setActiveSlide(true);
		getActiveSlide();
	});

	checkButtons();
})();

// Форма отправки
(function () {
	const feedbackSection = document.querySelector('.feedback__inner');
	const feedbackForm = feedbackSection.querySelector('.form');
	const feedbackSubmit = feedbackSection.querySelector('#feedback-submit');

	const createSuccessMessageMarkup = function() {
		return (
			`<div class="feedback__description">
				<h2 class="title">Узнайте о запуске сервиса первым</h2>
				<p class="subtitle feedback__subtitle feedback__subtitle--done">Спасибо! Мы будем держать <br /> вас в курсе обновлений</p>
			</div>`
			);
	};

	const render = (container, template, place) => {
		container.insertAdjacentHTML(place, template);
	};

	const removeChilds = (parent) => {
		while (parent.firstChild) {
			parent.firstChild.remove();
		}
	};

	const onFormSubmit = function (evt) {
		evt.preventDefault();
		feedbackSubmit.disabled = true;
		feedbackForm.style.opacity = 0.6;

		setTimeout(() => {
			removeChilds(feedbackSection);
			render(feedbackSection, createSuccessMessageMarkup(), 'beforeend');
		}, 600)
	};

	feedbackForm.addEventListener('submit', onFormSubmit)
})();

// Переключатель меню
(function () {
	const page = document.body;
	const siteHeader = document.querySelector('.header');
	const switchButton = siteHeader.querySelector('.header__switch');
	const siteHeaderMenu = siteHeader.querySelector('.header__menu');

	switchButton.classList.remove('header__switch--nojs');
	siteHeaderMenu.classList.remove('header__menu--nojs');

	const noScrollBody = () => {
		page.classList.toggle('page__menu-open');
	}

	const changeButtonLabel = () => {
		if (switchButton.classList.contains('header__switch--close')) {
			switchButton.children[0].innerText = 'Закрыть меню';
		} else {
			switchButton.children[0].innerText = 'Открыть меню';
		}
	}

	const toggleSiteMenu = () => {
		siteHeaderMenu.classList.toggle('header__menu--opened');
		siteHeaderMenu.classList.toggle('header__menu--closed');
		switchButton.classList.toggle('header__switch--open');
		switchButton.classList.toggle('header__switch--close');
		noScrollBody();
	}

	switchButton.addEventListener('click', (evt) => {
		evt.preventDefault();
		toggleSiteMenu();
	});

	switchButton.addEventListener('click', (evt) => {
		evt.preventDefault();
		changeButtonLabel();
	});
})();

// Плавная прокрутка по якорям
(function () {
	const pageAnchors = document.querySelectorAll('a[href*="#"]');

	pageAnchors.forEach((link) => {

		link.addEventListener('click', (evt) => {
				evt.preventDefault();

				const blockID = link.getAttribute('href');
				document.querySelector(`${blockID}`).scrollIntoView({
					behavior: 'smooth',
					block: 'start'
				});

		});
	});
})();

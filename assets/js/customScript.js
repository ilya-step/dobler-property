// плавающая шапка
var tempScrollTop, currentScrollTop = $(window).scrollTop(); //объявление переменных и присвоение им значений
$(window).scroll(function () { //Вызов функции при прокрутке страницы
	currentScrollTop = $(window).scrollTop(); //присвоение переменной нового значения
	if (currentScrollTop > $('#header').outerHeight()) { //Проверка условия 'переменная больше высоты шапки'
		$('#header').addClass('fixed-header'); // создание класса 'fixed-header' в селекторе 'header-top'
		$('body').css('padding-top', $('#header').outerHeight()); // создание класса 'fixed-header' в селекторе 'header-top'
	} else { // выполнение, если первое условие не прошло проверку
		$('#header').removeClass('fixed-header'); // удаление класса 'fixed-header' в селекторе 'header-top'
		$('body').css('padding-top', '0px'); // создание класса 'fixed-header' в селекторе 'header-top'
	}
	tempScrollTop = currentScrollTop; //присвоение одной переменной значение другой
});


// Меню бургер
const iconMenu = document.querySelector('.burger-menu');
const menuItem = document.querySelector('.menu-item');
const header = document.querySelector('.header');
if (iconMenu) {
	const menuBody = document.querySelector('.menubox');
	iconMenu.addEventListener("click", function (e) {
		document.body.classList.toggle('_lock')
		iconMenu.classList.toggle('active');
		menuBody.classList.toggle('active');
	});

	// закрыть меню при переходе на элемент меню
	var menuItems = document.getElementsByClassName("menu-item");
	var j;
	for (j = 0; j < menuItems.length; j++) {
		menuItems[j].addEventListener("click", function () {
			document.body.classList.toggle('_lock')
			iconMenu.classList.toggle('active');
			menuBody.classList.toggle('active');
		});
	}
}


// Анимация при скролле
function onEntry(entry) {
	entry.forEach(change => {
		if (change.isIntersecting) {
			change.target.classList.add('action');
		}
	});
}
let options = {
	threshold: [0.5]
};
let observer = new IntersectionObserver(onEntry, options);
let elements = document.querySelectorAll('.animated');
for (let elm of elements) {
	observer.observe(elm);
}


// плавная прокрутка по якорям
$('a[href*=#]:not([href=#])').click(function () {
	if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
		var target = $(this.hash);
		target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
		headerHeight = $('#header').outerHeight();
		if (target.length) {
			$('html,body').animate({
				scrollTop: target.offset().top - headerHeight
			}, 500, function () {
				target.focus();
			});
			return false;
		}
	}
});


// Все попапы
const myModal = new HystModal({
	linkAttributeName: "data-hystmodal",
	// настройки (не обязательно), см. API
});


// маска на телефон
let selector = document.querySelectorAll('input[type="tel"]');
if (selector.length > 0) {
	let im = new Inputmask('+7 (999) 999-99-99');
	im.mask(selector);
	let selector2 = document.querySelector('input[type="tel"]');
	selector2.addEventListener('input', function () {
		const re = /^\d*(\.\d+)?$/
	});
}


// отправка формы
$(document).ready(function () {
	$("form").submit(function () {
		var th = $(this);
		$.ajax({
			type: "POST",
			url: "mail.php",
			data: th.serialize(),
		}).done(function () {
			document.location.href = "./thanks.html";
			// document.querySelector('.zagl-form').style.display = "none";
			// document.querySelector('.tnx').style.display = "block";
			setTimeout(function () {
				// Выполнено
				th.trigger("reset");
			}, 1000);
		});
		return false;
	});
});


// слайдер Swiper каталога
let windowInnerWidth = window.innerWidth;
function checkWindowSize() {
	windowInnerWidth = window.innerWidth;
	if (windowInnerWidth < 980 && windowInnerWidth > 680) {
		var catalogSwiper = new Swiper(".catalog-swiper", {
			slidesPerView: 'auto',
			grid: {
				rows: 2,
			},
			spaceBetween: 20,
		});
	}
}
// Выполняем проверку при загрузке страницы
checkWindowSize();
// Добавляем слушатель на событие resize
window.addEventListener('resize', checkWindowSize);
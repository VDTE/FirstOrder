"use strict";
// Скрипт для меню
let selected = null;

document.querySelector(".wrapper").addEventListener(
  "click",
  (event) => {
    if (event.target.closest(".nav__link")) {
      if (selected) {
        selected.classList.remove("active");
      }

      selected = event.target;

      selected.classList.add("active");
    }
  },
  false
);

// Скрипт для появления блоков
//! Находим все объекты которые будут подвергаться анимации при скролле
const animItems = document.querySelectorAll("._anim-items");
//! Делаем проверку на наличие этих элементов
if (animItems.length > 0) {
  //! Добовляем слушатель события  при скролле которые будет вызывать фукцию
  window.addEventListener("scroll", animOnScroll);
  //! создаем функцию для анимации при скролле
  function animOnScroll() {
    for (let index = 0; index < animItems.length; index++) {
      //! Получаем каждый элемент из массива
      const animItem = animItems[index];
      //! получаем высоту объекта
      const animItemHeight = animItem.offsetHeight;
      //! Получаем позицию объекта относительно верха
      const animItemOffset = offset(animItem).top;
      //! Коэффициент момента старта анимации
      const animStart = 4;

      //! Настройка старта анимации
      let animItemPoint = window.innerHeight - animItemHeight / animStart;
      if (animItemHeight > window.innerHeight) {
        animItemPoint = window.innerHeight - window.innerHeight / animStart;
      }
      //! Пишем условия анимации для объектов, которые находятся выше окна браузера, при выполнении условия мы добовляем класс "_active", если мы прокрутили объект или недокрутили объект, то класс _active у него убирается
      if (
        pageYOffset > animItemOffset - animItemPoint &&
        pageYOffset < animItemOffset + animItemHeight
      ) {
        animItem.classList.add("_active");
      } else {
        if (!animItem.classList.contains("_anim-no-hide")) {
          animItem.classList.remove("_active");
        }
      }
    }
  }
  //! получаем корктное значение относительно верха
  function offset(el) {
    const rect = el.getBoundingClientRect(),
      scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
      scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return { top: rect.top + scrollTop, left: rect.left + scrollLeft };
  }
  //! Добовляем функцию для объектов, которые уже находятся в зоне видимости + добовляем setTimeout чтобы была изначальная задержка
  setTimeout(() => {
    animOnScroll();
  }, 300);
}
//? (1) Добавить специальный дежурный класс ("_anim-no-hide")
//? (2) На 28 строчке пишем условие, которое будет проверять есть данный класс у объекта или нет, если данного класса НЕТУ, то класс _active убирается

const popupLinks = document.querySelectorAll(".popup-link");
const body = document.querySelector("body");
const lockPadding = document.querySelectorAll(".lock-padding");

let unlock = true;

const timeout = 800;

if (popupLinks.length > 0) {
  for (let index = 0; index < popupLinks.length; index++) {
    const popupLink = popupLinks[index];
    popupLink.addEventListener("click", function (e) {
      const popupName = popupLink.getAttribute("href").replace("#", "");
      const curentPopup = document.getElementById(popupName);
      popupOpen(curentPopup);
      e.preventDefault();
    });
  }
}
const popupCloseIcon = document.querySelectorAll(".close-popup");
if (popupCloseIcon.length > 0) {
  for (let index = 0; index < popupCloseIcon.length; index++) {
    const el = popupCloseIcon[index];
    el.addEventListener("click", function (e) {
      popupClose(el.closest(".popup"));
      e.preventDefault();
    });
  }
}

function popupOpen(curentPopup) {
  if (curentPopup && unlock) {
    const popupActive = document.querySelector(".popup.open");
    if (popupActive) {
      popupClose(popupActive, false);
    } else {
      bodyLock();
    }
    curentPopup.classList.add("open");
    curentPopup.addEventListener("click", function (e) {
      if (!e.target.closest(".popup__content")) {
        popupClose(e.target.closest(".popup"));
      }
    });
  }
}

function popupClose(popupActive, doUnlock = true) {
  if (unlock) {
    popupActive.classList.remove("open");
    if (doUnlock) {
      bodyUnLock();
    }
  }
}

function bodyLock() {
  const lockPaddingValue =
    window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px";

  if (lockPadding.length > 0) {
    for (let index = 0; index < lockPadding.length; index++) {
      const el = lockPadding[index];
      el.style.paddingRight = lockPaddingValue;
    }
  }
  body.style.paddingRight = lockPaddingValue;
  body.classList.add("lock");

  unlock = false;
  setTimeout(function () {
    unlock = true;
  }, timeout);
}

function bodyUnLock() {
  setTimeout(function () {
    if (lockPadding.length > 0) {
      for (let index = 0; index < lockPadding.length; index++) {
        const el = lockPadding[index];
        el.style.paddingRight = "0px";
      }
    }
    body.style.paddingRight = "0px";
    body.classList.remove("lock");
  }, timeout);

  unlock = false;
  setTimeout(function () {
    unlock = true;
  }, timeout);
}

document.addEventListener("keydown", function (e) {
  if (e.which === 27) {
    const popupActive = document.querySelector(".popup.open");
    popupClose(popupActive);
  }
});

(function () {
  // проверяем поддержку
  if (!Element.prototype.closest) {
    // реализуем
    Element.prototype.closest = function (css) {
      var node = this;
      while (node) {
        if (node.matches(css)) return node;
        else node = node.parentElement;
      }
      return null;
    };
  }
})();
(function () {
  // проверяем поддержку
  if (!Element.prototype.matches) {
    // определяем свойство
    Element.prototype.matches =
      Element.prototype.matchesSelector ||
      Element.prototype.webkitMatchesSelector ||
      Element.prototype.mozMatchesSelector ||
      Element.prototype.msMatchesSelector;
  }
})();

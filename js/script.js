var link = document.querySelector(".map-contacts-button");

var modal = document.querySelector(".modal-feedback");
var close = modal.querySelector(".modal-close");

var form = modal.querySelector("form");
var username = modal.querySelector("[name=feedback-name]");
var email = modal.querySelector("[name=feedback-email]");
var message = modal.querySelector("[name=feedback-text]");

var isStorageSupport = true;
var feedbackNameStorage = "";
var feedbackEmailStorage = "";

try {
  feedbackNameStorage = localStorage.getItem("feedback-name");
  feedbackEmailStorage = localStorage.getItem("feedback-email");
} catch (err) {
  isStorageSupport = false;
}

link.addEventListener("click", function (evt) {
  evt.preventDefault();
  modal.classList.add("modal-show");

  username.focus();
  if (feedbackNameStorage) {
    username.value = feedbackNameStorage;
    email.focus();
  }
  if (feedbackEmailStorage) {
    email.value = feedbackEmailStorage;
    message.focus();
  }
});

close.addEventListener("click", function (evt) {
  evt.preventDefault();
  modal.classList.remove("modal-show");
  modal.classList.remove("modal-error");
});

form.addEventListener("submit", function (evt) {
  if (!username.value || !message.value) {
    evt.preventDefault();
    modal.classList.remove("modal-error");
    modal.offsetWidth = modal.offsetWidth;
    modal.classList.add("modal-error");
  } else {
    if (isStorageSupport) {
      localStorage.setItem("feedback-name", username.value);
      if (email.value) {
        localStorage.setItem("feedback-email", email.value);
      }
    }
  }
});

window.addEventListener("keydown", function (evt) {
  if (evt.keyCode === 27) {
    evt.preventDefault();
    if (modal.classList.contains("modal-show")) {
      modal.classList.remove("modal-show");
      modal.classList.remove("modal-error");
    }
  }
});

// Функция ymaps.ready() будет вызвана, когда
// загрузятся все компоненты API, а также когда будет готово DOM-дерево.
ymaps.ready(init);
function init(){
  // Создание карты.
  var myMap = new ymaps.Map("map", {
    // Координаты центра карты.
    // Порядок по умолчанию: «широта, долгота».
    // Чтобы не определять координаты центра карты вручную,
    // воспользуйтесь инструментом Определение координат.
    center: [59.938631, 30.327055],
    // Уровень масштабирования. Допустимые значения:
    // от 0 (весь мир) до 19.
    zoom: 15
  });
  var myPlacemark = new ymaps.Placemark([59.938631, 30.323055], {
    // Чтобы балун и хинт открывались на метке, необходимо задать ей определенные свойства.
    balloonContentHeader: "Gllacy Shop",
    balloonContentBody: "ул. Большая Конюшенная 19/8, Санкт-Петербург",
    balloonContentFooter: "8 812 450-25-25",
    hintContent: "Gllacy Shop"
  });
  myMap.geoObjects.add(myPlacemark);
}

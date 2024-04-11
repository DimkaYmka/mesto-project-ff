function openPopup(popupElement) {
  popupElement.classList.add('popup_is-opened');
  document.addEventListener('keydown', closePopupEscape);
  document.addEventListener("mousedown", closePopupByOverlay);
}

//закрытие попапа
function closePopup(popupElement) {
  //сбрасываем поля ввода в формах после закрытия
  const formElement = popupElement.querySelector('.popup__form');
  if (formElement) {
    formElement.reset();
  }
  popupElement.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closePopupEscape);
  document.removeEventListener("mousedown", closePopupByOverlay);
};

//закрытие формы по esc
function closePopupEscape(evt) {
  if (evt.key === "Escape") {
    const popupOpened = document.querySelector('.popup_is-opened');
    closePopup(popupOpened);
  };
};

const closePopupByOverlay = evt => {
  if (evt.target.classList.contains('popup_is-opened') || evt.target.classList.contains('popup__close')) {
    const popupOpened = document.querySelector('.popup_is-opened');
    closePopup(popupOpened);
  }
};

export { openPopup, closePopup, closePopupEscape };
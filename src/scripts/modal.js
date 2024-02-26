import {  popups, forms, bigImage, bigTitle } from "../constants/constants";



function openPopup(popupElement) {
  popupElement.classList.add('popup_is-opened');
  document.addEventListener('keydown', closePopupEscape);
  // validatorProfileForm.resetValidation();
  // validatorCardForm.resetValidation();
};



//закрытие попапа
function closePopup(popupElement) {
  popupElement.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closePopupEscape);
};

//закрытие формы по esc
function closePopupEscape(evt) {
  if (evt.key === "Escape") {
    const popupOpened = document.querySelector('.popup_is-opened');
    closePopup(popupOpened);
  };
};


popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_is-opened')) {
      closePopup(popup)
    }
    if (evt.target.classList.contains('popup__close')) {
      closePopup(popup)
    }
  })
})


// //
forms.forEach((formElement) => {
  formElement.addEventListener('submit', (e) => {
    e.preventDefault();
  })

})


export { openPopup, closePopup, closePopupEscape};
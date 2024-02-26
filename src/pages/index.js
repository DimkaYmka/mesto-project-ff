import '../pages/index.css';
import { initialCards, createNewCard, renderCard } from '../scripts/cards.js';
import {  openPopup, closePopup } from '../scripts/modal.js'
import {
  openCardButton, openProfileButtton, inputInfo,
  inputName, nameInfo, jobInfo, popupProfile, cardPopup,
  profileForm, bigPopup, bigImage, bigTitle, popupImage, popups
} from "../constants/constants";


// вставляем карточки из массива
initialCards.forEach((element) => {
  renderCard(element.name, element.link);
});

//сабмит для профиля
function handleProfileFormSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  nameInfo.textContent = inputName.value;
  jobInfo.textContent = inputInfo.value;
  closePopup(popupProfile);

}

//Слушатель на открытие добавления карточек
openCardButton.addEventListener('click', () => {
  // cleanInput();
  // validatorCardForm.resetValidation();
  openPopup(cardPopup)
});


//открытие большой картинки
function openImagePopup(evt) {
  openPopup(bigPopup)
  bigImage.src = evt.target.src;
  bigImage.alt = evt.target.alt;
  bigTitle.textContent = evt.target.alt;
};

// openImagePopup()

popupImage.addEventListener('click', () => {
  openImagePopup(bigPopup)
});

//Слушатель на открытие для профиля
openProfileButtton.addEventListener('click', () => {
  inputName.value = nameInfo.textContent;
  inputInfo.value = jobInfo.textContent;
  // validatorProfileForm.resetValidation();
  openPopup(popupProfile)
});




//Слушатель на сабмит для профиля
profileForm.addEventListener('submit', handleProfileFormSubmit);



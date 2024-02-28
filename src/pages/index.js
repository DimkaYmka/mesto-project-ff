import '../pages/index.css';
import { initialCards, createNewCard, renderCard, deleteFunction, likeFunction } from '../scripts/card.js';
import { openPopup, closePopup } from '../scripts/modal.js'
import {
  openCardButton, openProfileButtton, inputInfo,
  inputName, nameInfo, jobInfo, popupProfile, cardPopup,
  profileForm, bigPopup, bigImage, bigTitle, placeNameInput, placeUrlInput,
  popupAddCardForm, cardsConteiner, forms
} from "../constants/elements.js";

//слушатель клика по кнопке сохранения формы добавления карточки
popupAddCardForm.addEventListener('submit', handleCardFormSubmit);

function handleCardFormSubmit(evt) {
  evt.preventDefault();

  const card = {
    name: placeNameInput.value,
    link: placeUrlInput.value
  };
  cardsConteiner.append(renderCard(card.name, card.link, openImagePopup, deleteFunction, likeFunction));

  closePopup(cardPopup);
  popupAddCardForm.reset();
}

// // слушатель формы
forms.forEach((formElement) => {
  formElement.addEventListener('submit', (e) => {
    e.preventDefault();
  })

})

//Слушатель на открытие для профиля
openProfileButtton.addEventListener('click', () => {
  inputName.value = nameInfo.textContent;
  inputInfo.value = jobInfo.textContent;
  openPopup(popupProfile)
});

//Слушатель на сабмит для профиля
profileForm.addEventListener('submit', handleProfileFormSubmit);

//Слушатель на открытие добавления карточек
openCardButton.addEventListener('click', () => {
  openPopup(cardPopup)
});

//сабмит для профиля
function handleProfileFormSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  nameInfo.textContent = inputName.value;
  jobInfo.textContent = inputInfo.value;
  closePopup(popupProfile);

}

//открытие большой картинки
function openImagePopup(dataCard) {
  openPopup(bigPopup)
  console.log(dataCard.link);
  bigImage.src = dataCard.link;
  bigImage.alt = dataCard.name;
  bigTitle.textContent = dataCard.name;
};

// вставляем карточки из массива
initialCards.forEach((element) => {
  renderCard(element.name, element.link, openImagePopup, deleteFunction, likeFunction);
});





import '../pages/index.css';
import { initialCards, createNewCard, renderCard } from '../scripts/cards.js';
import { openPopup, closePopup } from '../scripts/modal.js'
import {
  openCardButton, openProfileButtton, inputInfo,
  inputName, nameInfo, jobInfo, popupProfile, cardPopup,
  profileForm, bigPopup, bigImage, bigTitle, getInput, getInputUrl, 
  popupAddCardForm, cardsConteiner
} from "../constants/constants";


//слушатель клика по кнопке сохранения формы добавления карточки
popupAddCardForm.addEventListener('submit', handleCardFormSubmit);

function handleCardFormSubmit(evt) {
  evt.preventDefault();

  const card = {};
  console.log(getInput.value);

  card.name = getInput.value;
  card.link = getInputUrl.value;

  cardsConteiner.append(renderCard(card.name, card.link, openImagePopup));

  closePopup(cardPopup);
  popupAddCardForm.reset();
}




//Слушатель на открытие для профиля
openProfileButtton.addEventListener('click', () => {
  inputName.value = nameInfo.textContent;
  inputInfo.value = jobInfo.textContent;
  // validatorProfileForm.resetValidation();
  openPopup(popupProfile)
});

//Слушатель на сабмит для профиля
profileForm.addEventListener('submit', handleProfileFormSubmit);

// profileForm.addEventListener('submit', handleCardSubmit);


//Слушатель на открытие добавления карточек
openCardButton.addEventListener('click', () => {
  // cleanInput();
  // validatorCardForm.resetValidation();
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
  renderCard(element.name, element.link, openImagePopup);
});




